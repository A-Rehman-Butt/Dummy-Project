import {IsString, IsPhoneNumber, MinLength } from "class-validator";

export class LoginViaPhoneDto{
    @IsPhoneNumber()
    phoneNumber: string;

    @IsString()
    @MinLength(8)
    password: string;
}