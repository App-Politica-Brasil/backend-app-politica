import { IsEmail } from 'class-validator';

export class AuthForgetDto {
    @IsEmail()
    user_email: string;
}
