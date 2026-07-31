import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  userId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  hashtagIds?: number[];
}
