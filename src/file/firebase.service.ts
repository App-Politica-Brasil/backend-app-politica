import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Storage, Bucket } from '@google-cloud/storage';
import credentials from '../config/config';
import { initializeApp } from 'firebase-admin/app';
import { credential, ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseStorageService {
    private readonly bucket: Bucket;

    constructor() {
        initializeApp({
            credential: credential.cert(<ServiceAccount>credentials),
        });

        const storage = new Storage({
            projectId: credentials.projectId,
            credentials: {
                client_email: credentials.client_email,
                private_key: credentials.private_key,
            },
        });
        this.bucket = storage.bucket(credentials.storageBucket);
    }

    async uploadFile(
        userId: string,
        file: Express.Multer.File,
    ): Promise<string> {
        const fileName = `photo-${userId}-${Date.now()}.png`;
        const fileRef = this.bucket.file(`photos/${fileName}`);

        const uploadStream = fileRef.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
            resumable: false,
        });

        await new Promise((resolve, reject) => {
            uploadStream.on('finish', resolve);
            uploadStream.on('error', reject);
            uploadStream.end(file.buffer);
        });

        return fileName;
    }
}
