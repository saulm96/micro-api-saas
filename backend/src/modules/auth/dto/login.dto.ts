import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}