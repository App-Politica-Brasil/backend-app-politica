import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    async login(@Body() { user_email, user_password }: AuthLoginDto) {
        return this.authService.login(user_email, user_password);
    }

    //To Do: usar create user
    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() { user_email }: AuthForgetDto) {
        return this.authService.forget(user_email);
    }

    @Post('reset')
    async reset(@Body() { user_password, token }: AuthResetDto) {
        return this.authService.reset(user_password, token);
    }
}
