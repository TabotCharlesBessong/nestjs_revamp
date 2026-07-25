import { Controller, Get } from '@nestjs/common';

@Controller('tweets')
export class TweetController {
  @Get()
  getTweets() {
    return 'This action returns all tweets';
  }
}
