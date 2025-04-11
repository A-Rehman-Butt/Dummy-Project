import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(15)
  passcodePhrase: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
