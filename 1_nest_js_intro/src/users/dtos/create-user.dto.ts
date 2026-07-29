import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @MaxLength(30)
  @IsOptional()
  username: string;

  @IsOptional()
  age: number;

  @IsOptional()
  isMarried: boolean;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password should have a minimum length of 6 characters',
  })
  @MaxLength(100)
  password: string;
}
