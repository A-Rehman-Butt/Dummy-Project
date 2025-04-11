import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(['Therapist', 'Practice', 'Other'], {
    message: 'Valid user type required',
  })
  userType: 'Therapist' | 'Practice' | 'Other';

  @IsString()
  @MinLength(15)
  passcodePhrase: string;
}
