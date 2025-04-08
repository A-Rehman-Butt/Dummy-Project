import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginViaEmailDto } from './dto/loginViaEmail.dto'
import { LoginViaPhoneDto } from './dto/loginViaPhone.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';

@Injectable()
export class UsersService {


    registerUser(registerUserDto: RegisterUserDto){}

    loginViaEmail(loginViaEmailDto: LoginViaEmailDto){}

    loginViaPhone(loginViaPhoneDto: LoginViaPhoneDto){}

    updatePassword(updatePasswordDto: UpdatePasswordDto){}

    
}
