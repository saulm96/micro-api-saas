import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'El email no es válido' })
    @IsNotEmpty()
    readonly email: string;

    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @IsNotEmpty()
    readonly password: string;
}