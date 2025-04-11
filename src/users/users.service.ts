import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginViaEmailDto } from './dto/loginViaEmail.dto';
import { LoginViaPhoneDto } from './dto/loginViaPhone.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(registerUserPayload: RegisterUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        registerUserPayload.password,
        10,
      );
      registerUserPayload.password = hashedPassword;
      await this.prisma.user.create({
        data: registerUserPayload,
      });

      return {
        status: 'Success',
        message: 'User Registered',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Unique constraint violation
          throw new HttpException(
            'User with this email or phone already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      // Handle other errors
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginViaEmail(loginViaEmailPayload: LoginViaEmailDto) {
    const user: any = await this.prisma.user.findFirst({
      where: {
        email: loginViaEmailPayload.email,
      },
    });
    if (!user) {
      throw new HttpException('Email is not valid', HttpStatus.CONFLICT);
    }

    const validPassword = await bcrypt.compare(
      loginViaEmailPayload.password,
      user.password,
    );
    if (!validPassword) {
      throw new HttpException('Password is not valid', HttpStatus.CONFLICT);
    }

    return {
      status: 'Success',
      message: 'User Logged In',
    };
  }

  async loginViaPhone(loginViaPhonePayload: LoginViaPhoneDto) {
    const user: any = await this.prisma.user.findFirst({
      where: {
        phoneNumber: loginViaPhonePayload.phoneNumber,
      },
    });
    if (!user) {
      throw new HttpException('Phone number is not valid', HttpStatus.CONFLICT);
    }

    const validPassword = await bcrypt.compare(
      loginViaPhonePayload.password,
      user.password,
    );
    if (!validPassword) {
      throw new HttpException('Password is not valid', HttpStatus.CONFLICT);
    }

    return {
      status: 'Success',
      message: 'User Logged In',
    };
  }

  async updatePassword(updatePasswordPayload: UpdatePasswordDto) {
    try {
      const user: any = await this.prisma.user.findFirst({
        where: {
          email: updatePasswordPayload.email,
        },
      });
      if (!user) {
        throw new HttpException('Email is not valid', HttpStatus.CONFLICT);
      }

      if (updatePasswordPayload.passcodePhrase === user.passcodePhrase) {
        const hashedPassword = await bcrypt.hash(
          updatePasswordPayload.newPassword,
          10,
        );
        updatePasswordPayload.newPassword = hashedPassword;

        await this.prisma.user.update({
          where: { id: user.id },
          data: { password: updatePasswordPayload.newPassword },
        });
      } else {
        throw new HttpException(
          'Passcode Phrase is not valid',
          HttpStatus.CONFLICT,
        );
      }

      return {
        status: 'Success',
        message: 'Password Updated',
      };
    } catch (error) {
      console.error('Password Reset error:', error);
      throw error;
    }
  }
}
