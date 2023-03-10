import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const data = await this.usersService.create(createUserDto);
        return { data };
    }

    @Get()
    async findAll() {
        const data = await this.usersService.findAll();
        return { data };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const data = await this.usersService.findOne(+id);
        return { data };
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const data = await this.usersService.update(+id, updateUserDto);
        return { data };
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
