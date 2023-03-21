import { IsEmail } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class AuthForgetDto extends CreateUserDto {
    @IsEmail()
    user_email: string;
}
