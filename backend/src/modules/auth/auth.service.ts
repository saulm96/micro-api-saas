import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findOneByEmail(createUserDto.email);
        if (existingUser) {
            throw new BadRequestException('email already in use');
        }

        const newUser = await this.usersService.create(createUserDto);

        return {
            message: 'User created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                isActive: newUser.isActive,
            },
        };
    }
    //--- lOGIN METHODS ---
    //Validate that user exists and password is correct
    async validateUser(loginDto: LoginDto) {
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (user && (await user.validatePassword(loginDto.password))) {
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email
            }
        }
    }
}