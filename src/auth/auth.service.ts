import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async createToken() {
        //return this.jwtService.sign()
    }

    async checkToken(token: string) {
        return this.jwtService.verify;
    }

    async login(user_email: string, user_password: string) {
        const user = await this.prisma.user.findFirst({
            where: { user_email, user_password },
        });
        if (!user) {
            throw new UnauthorizedException('Email ou Senha incorretos');
        }
        return user;
    }

    async forget(user_email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                user_email,
            },
        });
        if (!user) {
            throw new UnauthorizedException('Usuario não encontrado');
        }

        //TODO enviar email nodemailer
        return true;
    }

    async reset(user_password: string, token: string) {
        //TODO: se o token for valido... (validar)

        const user_id = 0;

        await this.prisma.user.update({
            where: {
                user_id,
            },
            data: {
                user_password,
            },
        });
        return true;
    }
}
