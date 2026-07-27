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
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'First name should have a minimum length of 3 characters',
  })
  @MaxLength(100)
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Last name should have a minimum length of 3 characters',
  })
  @MaxLength(100)
  lastName: string;
  @IsString()
  @MaxLength(100)
  username: string;
  @IsEmail()
  @MaxLength(100)
  email: string;
  @IsNumber()
  age: number;
  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender: string;
  @IsBoolean()
  isMarried: boolean;
  @IsString()
  @MinLength(6, {
    message: 'Password should have a minimum length of 6 characters',
  })
  @MaxLength(100)
  password: string;
}
