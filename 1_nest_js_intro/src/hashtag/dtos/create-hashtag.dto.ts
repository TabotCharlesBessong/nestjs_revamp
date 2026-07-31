import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateHashtagDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
