import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { FileModule } from 'src/file/file.module';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        UsersModule,
        PrismaModule,
        FileModule,
    ],
    exports: [UsersModule, PrismaModule],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {}
