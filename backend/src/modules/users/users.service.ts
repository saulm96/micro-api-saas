import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create({
            email: createUserDto.email,
            password: createUserDto.password,
        });
    }
}