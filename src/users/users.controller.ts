import { Body, Controller, Patch, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UsersService } from './users.service';
import { LoginViaEmailDto } from './dto/loginViaEmail.dto';
import { LoginViaPhoneDto } from './dto/loginViaPhone.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post('register')
    registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto){
        this.userService.registerUser(registerUserDto)
    }

    @Post('login-via-email')
    loginViaEmail(@Body(ValidationPipe) loginViaEmailDto: LoginViaEmailDto){
        this.userService.loginViaEmail(loginViaEmailDto)
    }

    @Post('login-via-phone')
    loginViaPhone(@Body(ValidationPipe) loginViaPhoneDto: LoginViaPhoneDto){
        this.userService.loginViaPhone(loginViaPhoneDto)
    }

    @Patch('forgot-password')
    updatePassword(@Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto){
        this.userService.updatePassword(updatePasswordDto)
    }

}
