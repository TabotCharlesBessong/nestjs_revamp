import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getAllUsers() {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  public async createUser(createDto: CreateUserDto) {
    // validate if user exists
    const userExists = await this.userRepository.findOne({
      where: { email: createDto.email },
    });

    // handles error or exeception
    if (userExists) {
      throw new Error('User already exists');
    }

    // create the user and insert into the database
    const newUser = this.userRepository.create(createDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  public async updateUser(id: number, updateDto: Partial<CreateUserDto>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateDto);
    return this.userRepository.save(user);
  }
}
