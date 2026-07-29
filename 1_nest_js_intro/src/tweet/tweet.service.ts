import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async getTweetsByUserId(userId: number) {
    return this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async createTweet(createTweetDto: CreateTweetDto) {
    const tweet = this.tweetRepository.create(createTweetDto);
    return this.tweetRepository.save(tweet);
  }
}
