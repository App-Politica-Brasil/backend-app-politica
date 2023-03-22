import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        JwtModule.register({
            secret: `%f23!3b#B$2)^aJ7U85GVe8FNRHJ2njm`,
        }),
        UsersModule,
        PrismaModule,
    ],
    exports: [UsersModule, PrismaModule],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
})
export class AuthModule {}