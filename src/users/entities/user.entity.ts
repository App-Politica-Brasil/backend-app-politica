import { Prisma } from '@prisma/client';

export class User implements Prisma.userUncheckedCreateInput {
    user_id?: number;
    user_type_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    creation_date?: string | Date;
    user_achievements: string;
}
