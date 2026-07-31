import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
  exports: [HashtagService],
})
export class HashtagModule {}
