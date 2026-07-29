import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'First name should have a minimum length of 3 characters',
  })
  @MaxLength(100)
  firstName?: string;
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Last name should have a minimum length of 3 characters',
  })
  @MaxLength(100)
  lastName?: string;
  @IsOptional()
  @MaxLength(30)
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsDate()
  // @IsNotEmpty()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  bio?: string;
}
