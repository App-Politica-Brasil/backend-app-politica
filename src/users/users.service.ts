import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto) {
        const data = {
            ...createUserDto,
        };

        //Email Verification:
        const existingUser = await this.prisma.user.findUnique({
            where: { user_email: data.user_email },
        });

        if (existingUser) {
            throw new ConflictException(
                'Email ja cadastrado em nossa base de dados',
            );
        }

        const createdUser = await this.prisma.user.create({ data });

        return {
            ...createdUser,
            //Todo: Make a password encrypt
            //user_password: undefined,
        };
    }

    async findAll() {
        return await this.prisma.user.findMany();
    }

    async findOne(user_id: number) {
        const data = await this.prisma.user.findUnique({
            where: { user_id },
        });

        if (!data) {
            return new NotFoundException('Usuario não encontrado');
        }

        return data;
    }

    async update(user_id: number, updateUserDto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: { user_id },
            data: updateUserDto,
        });
    }

    async remove(user_id: number) {
        return await this.prisma.user.delete({
            where: { user_id },
        });
    }
}
