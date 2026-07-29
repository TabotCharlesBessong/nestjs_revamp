import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;
  @IsEmail()
  @MaxLength(100)
  email: string;
  @IsOptional()
  @MaxLength(30)
  @IsOptional()
  username: string;
  @IsNumber()
  age: number;
  @IsBoolean()
  isMarried: boolean;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password should have a minimum length of 6 characters',
  })
  @MaxLength(100)
  password: string;
}
