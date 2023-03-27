import {
    Controller,
    Body,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    ParseFilePipe,
    FileTypeValidator,
    MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { join } from 'path';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
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

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user };
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: 'image/png' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
                ],
            }),
        )
        photo: Express.Multer.File,
    ) {
        const path = join(
            __dirname,
            '..',
            '..',
            'storage',
            'photos',
            `photo-${user.user_id}.png`,
        );

        try {
            await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e);
        }

        return { sucess: true, photo };
    }
}
