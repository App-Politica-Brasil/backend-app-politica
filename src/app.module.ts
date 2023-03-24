import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
//Mail Configuration *************
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PrismaModule,
        AuthModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'jalen.mills@ethereal.email',
                    pass: 'm1bDu6yjSJ6CdBW4PQ',
                },
            },
            defaults: {
                from: '"nest-modules" <jalen.mills@ethereal.email>',
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
