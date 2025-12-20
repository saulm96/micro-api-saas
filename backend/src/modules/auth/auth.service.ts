import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

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
}