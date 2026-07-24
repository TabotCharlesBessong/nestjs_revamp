import { Controller, Get } from '@nestjs/common';

@Controller('tweet')
export class TweetController {
  @Get()
  getTweets(){
    return "This action returns all tweets"
  }
}
