import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService, PhotoService } from './file.service';
import { FirebaseStorageService } from './firebase.service';

@Module({
    providers: [
        FileService,
        FirebaseStorageService,
        PhotoService,
        PrismaService,
    ],
    exports: [FileService, FirebaseStorageService, PhotoService, PrismaService],
})
export class FileModule {}
