import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { Endpoint } from './entities/endpoint.entity';
import { ApiKey } from './entities/api-key.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Project, Endpoint, ApiKey]),
        AuthModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService]
})
export class ProjectsModule { }