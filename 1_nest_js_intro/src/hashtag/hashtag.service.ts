import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';
import { UpdateHashtagDto } from './dtos/update-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async findAll() {
    return this.hashtagRepository.find({ relations: ['tweets'] });
  }

  async findOne(id: number) {
    const hashtag = await this.hashtagRepository.findOne({
      where: { id },
      relations: ['tweets'],
    });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }
    return hashtag;
  }

  async findByIds(ids: number[]) {
    return this.hashtagRepository.find({
      where: { id: In(ids) },
    });
  }

  async findByName(name: string) {
    return this.hashtagRepository.find({
      where: { name },
      relations: ['tweets'],
    });
  }

  async getTweetsByHashtagId(id: number) {
    const hashtag = await this.hashtagRepository.findOne({
      where: { id },
      relations: ['tweets'],
    });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }
    return hashtag.tweets;
  }

  async create(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);
    return this.hashtagRepository.save(hashtag);
  }

  async update(id: number, updateHashtagDto: UpdateHashtagDto) {
    const hashtag = await this.hashtagRepository.findOne({ where: { id } });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }
    Object.assign(hashtag, updateHashtagDto);
    return this.hashtagRepository.save(hashtag);
  }

  async remove(id: number) {
    const hashtag = await this.hashtagRepository.findOne({ where: { id } });
    if (!hashtag) {
      throw new NotFoundException('Hashtag not found');
    }
    await this.hashtagRepository.remove(hashtag);
    return hashtag;
  }
}
