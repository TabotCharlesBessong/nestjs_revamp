import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { UpdateTweetDto } from './dtos/update-tweet.dto';
import { UsersService } from 'src/users/users.service';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagService,
  ) {}

  async findAll() {
    return this.tweetRepository.find({ relations: ['user', 'hashtags'] });
  }

  async findOne(id: number) {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['user', 'hashtags'],
    });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    return tweet;
  }

  async getTweetsByUserId(userId: number) {
    return this.tweetRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'hashtags'],
    });
  }

  async getHashtagsByTweetId(tweetId: number) {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: ['hashtags'],
    });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }
    return tweet.hashtags;
  }

  async create(createTweetDto: CreateTweetDto) {
    const { hashtagIds, userId, ...tweetData } = createTweetDto;

    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const tweet = this.tweetRepository.create({ ...tweetData, user });

    if (hashtagIds && hashtagIds.length > 0) {
      tweet.hashtags = await this.hashtagService.findByIds(hashtagIds);
    }

    return this.tweetRepository.save(tweet);
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const { hashtagIds, userId, ...tweetData } = updateTweetDto;

    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['user', 'hashtags'],
    });
    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    if (userId) {
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      tweet.user = user;
    }

    Object.assign(tweet, tweetData);

    if (hashtagIds) {
      if (hashtagIds.length > 0) {
        tweet.hashtags = await this.hashtagService.findByIds(hashtagIds);
      } else {
        tweet.hashtags = [];
      }
    }

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
