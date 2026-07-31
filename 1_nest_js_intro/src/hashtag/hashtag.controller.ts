import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dtos/create-hashtag.dto';
import { UpdateHashtagDto } from './dtos/update-hashtag.dto';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    if (name) {
      return this.hashtagService.findByName(name);
    }
    return this.hashtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.findOne(id);
  }

  @Get(':id/tweets')
  getTweets(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.getTweetsByHashtagId(id);
  }

  @Post()
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.create(createHashtagDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHashtagDto: UpdateHashtagDto,
  ) {
    return this.hashtagService.update(id, updateHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hashtagService.remove(id);
  }
}
