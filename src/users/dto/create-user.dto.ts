import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
    user_id?: number;
    user_type_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    creation_date?: string | Date;
    user_achievements: string;
}
