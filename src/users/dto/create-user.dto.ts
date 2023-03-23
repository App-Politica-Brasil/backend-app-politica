import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
    /**
     * O user_id vem de forma automatica através do banco de dados
     * Ele é autoincrementado,
     * @example 1
     */
    @IsInt()
    @IsOptional()
    user_id?: number;

    /**
     * O usuario pode ter (2)Tipos
     * ID(1) - Admin | ID(2) - User
     * @example 1
     */
    @IsInt()
    @IsEnum(Role)
    user_type_id: number;

    /**
     * O primeiro nome, utilizar ate 50 caracteres
     * @example Fulano
     */
    @IsString()
    user_name: string;

    /**
     * O email será utilizado no processo de login e geração jwt
     * Ele sera o mesmo para usuario ou admin
     * @example user@mail.com
     * O acesso tipo de acesso sera definido através das roles | user_type_id
     */
    @IsEmail()
    user_email: string;

    /**
     * O Password será utilizado no processo de login e geração jwt
     * Ele precisa conter de 8 a 20 caracteres
     * @example ABcd1234!!
     */
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    user_password: string;

    /**
     * Define a data de criação da partner
     * É usado para comparação dos logs;
     * @example 2022-12-29T00:00:00.000Z
     */
    @IsOptional()
    @IsDateString()
    creation_date?: string | Date;

    /**
     * A lista de conquistas
     * @example fulana
     */
    @IsOptional()
    @IsString()
    user_achievements: string;
}
