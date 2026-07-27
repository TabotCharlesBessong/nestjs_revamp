import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly usersService: UsersService) {}
  tweets: { text: string; date: Date; userId: number }[] = [
    { text: 'Hello World', date: new Date('2025-01-01'), userId: 1 },
    { text: 'Hello World 2', date: new Date('2025-01-02'), userId: 1 },
    { text: 'Hello World 3', date: new Date('2025-01-03'), userId: 2 },
  ];

  getTweetsByUserId(userId: number) {
    return this.tweets.filter((tweet) => tweet.userId === userId);
  }
}
