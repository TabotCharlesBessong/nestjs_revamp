import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/users/user.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.profileRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUserId(userId: number) {
    return this.profileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async create(userId: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      this.logger.warn(`User not found with id: ${userId}`);
      return null;
    }

    const existingProfile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingProfile) {
      this.logger.warn(
        `Profile already exists for user id: ${userId}, updating instead`,
      );
      Object.assign(existingProfile, createProfileDto);
      return this.profileRepository.save(existingProfile);
    }

    const profile = this.profileRepository.create({
      ...createProfileDto,
      user,
    });
    return this.profileRepository.save(profile);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      this.logger.warn(`Profile not found with id: ${id}`);
      return null;
    }
    if (updateProfileDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateProfileDto.userId },
      });
      if (!user) {
        this.logger.warn(`User not found with id: ${updateProfileDto.userId}`);
        return null;
      }
      profile.user = user;
    }
    Object.assign(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }

  async remove(id: number) {
    const profile = await this.profileRepository.findOne({ where: { id } });
    if (!profile) {
      this.logger.warn(`Profile not found with id: ${id}`);
      return null;
    }
    await this.profileRepository.remove(profile);
    return profile;
  }
}
