import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const expiresIn = configService.get<string>('JWT_EXPIRES_IN');

                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: (expiresIn ? expiresIn.trim() : '24h') as any,
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }