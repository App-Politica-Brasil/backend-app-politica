import { Injectable } from '@nestjs/common';
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

        const createdUser = await this.prisma.user.create({ data });

        return {
            ...createdUser,
            //user_password: undefined,
        };
    }

    async findAll() {
        return this.prisma.user.findMany();
    }

    findOne(user_id: number) {
        const user = this.prisma.user.findUnique({
            where: { user_id },
        });
        if (!user) {
            //throw new NotFoundException('Usuario não encontrado');
        }
        return user;
    }

    update(user_id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { user_id },
            data: updateUserDto,
        });
    }

    remove(user_id: number) {
        return this.prisma.user.delete({
            where: { user_id },
        });
    }
}
