import {
    IsJWT,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class AuthResetDto {
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

    @IsJWT()
    token: string;
}
