import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { DynamicEngineModule } from './modules/dynamic-engine/dynamic-engine.module';
import { VirtualDbModule } from './modules/virtual-db/virtual-db.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'mysql',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                autoLoadModels: true,
                synchronize: configService.get<string>('NODE_ENV') === 'development',
            }),
        }),
        UsersModule,
        AuthModule,
        ProjectsModule,
        DynamicEngineModule,
        VirtualDbModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }