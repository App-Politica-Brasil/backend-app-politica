import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UsersService,
    ) {}

    async createToken(user: User) {
        return {
            acess_token: this.jwtService.sign(
                {
                    id: user.user_id,
                    name: user.user_name,
                    email: user.user_email,
                },
                {
                    expiresIn: '7 days',
                    subject: String(user.user_id),
                    issuer: 'login',
                    audience: 'users',
                },
            ),
        };
    }

    async checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login',
            });

            return { data };
        } catch (e) {
            throw new BadRequestException();
        }
    }

    async login(user_email: string, user_password: string) {
        const user = await this.prisma.user.findFirst({
            where: { user_email },
        });
        if (!user) {
            throw new UnauthorizedException('Email ou Senha incorretos');
        }

        if (!(await bcrypt.compare(user_password, user.user_password))) {
            throw new UnauthorizedException('Email ou Senha incorretos');
        }

        return this.createToken(user);
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

        const user = await this.prisma.user.update({
            where: {
                user_id,
            },
            data: {
                user_password,
            },
        });
        return this.createToken(user);
    }

    async register(data: AuthRegisterDto) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }

    async isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false;
        }
    }
}
