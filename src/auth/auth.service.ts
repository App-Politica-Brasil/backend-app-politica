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
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UsersService,
        private readonly mailer: MailerService,
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

        const token = this.jwtService.sign(
            {
                user_id: user.user_id,
            },
            {
                expiresIn: '7 days',
                subject: String(user.user_id),
                issuer: 'forget',
                audience: 'users',
            },
        );

        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'teste@teste.com.br',
            template: 'forget',
            context: {
                name: user.user_name,
                token,
            },
        });

        return true;
    }

    async reset(user_password: string, token: string) {
        try {
            const data: any = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'forget',
            });
            if (isNaN(Number(data.user_id))) {
                throw new BadRequestException('Token é invalido');
            }

            const salt = await bcrypt.genSalt();
            user_password = await bcrypt.hash(user_password, salt);

            const user = await this.prisma.user.update({
                where: {
                    user_id: Number(data.user_id),
                },
                data: {
                    user_password,
                },
            });
            return this.createToken(user);
        } catch (e) {
            throw new BadRequestException(console.log(e));
        }
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
