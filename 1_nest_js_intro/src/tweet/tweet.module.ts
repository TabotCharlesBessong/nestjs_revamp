import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { Tweet } from './tweet.entity';
import { UsersModule } from 'src/users/users.module';
import { HashtagModule } from 'src/hashtag/hashtag.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UsersModule, HashtagModule],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
