import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
    async upload(file: Express.Multer.File, path: string) {
        return writeFile(path, file.buffer);
    }
}

@Injectable()
export class PhotoService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user_id: number, photo: string): Promise<any> {
        return this.prisma.photo.create({
            data: {
                user_id: user_id,
                photo: photo,
            },
        });
    }
}
