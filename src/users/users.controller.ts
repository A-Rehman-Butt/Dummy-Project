import { Body, Controller, Patch, Post } from '@nestjs/common';
import { LoginViaEmailDto } from './dto/loginViaEmail.dto';
import { LoginViaPhoneDto } from './dto/loginViaPhone.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.userService.registerUser(registerUserDto);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  @Post('login-via-email')
  async loginViaEmail(@Body() loginViaEmailDto: LoginViaEmailDto) {
    try {
      return await this.userService.loginViaEmail(loginViaEmailDto);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  @Post('login-via-phone')
  async loginViaPhone(@Body() loginViaPhoneDto: LoginViaPhoneDto) {
    try {
      return await this.userService.loginViaPhone(loginViaPhoneDto);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      return await this.userService.updatePassword(updatePasswordDto);
    } catch (error) {
      console.error('Password Reset error:', error);
      throw error;
    }
  }
}
