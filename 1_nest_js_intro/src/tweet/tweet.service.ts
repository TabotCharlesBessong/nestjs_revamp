import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async findAll() {
    return this.tweetRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    return tweet;
  }

  async getTweetsByUserId(userId: number) {
    return this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async create(createTweetDto: CreateTweetDto) {
    const tweet = this.tweetRepository.create(createTweetDto);
    return this.tweetRepository.save(tweet);
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const tweet = await this.tweetRepository.findOne({ where: { id } });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    Object.assign(tweet, updateTweetDto);
    return this.tweetRepository.save(tweet);
  }

  async remove(id: number) {
    const tweet = await this.tweetRepository.findOne({ where: { id } });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    await this.tweetRepository.remove(tweet);
    return tweet;
  }
}
