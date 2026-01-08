import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Project } from './entities/project.entity';
import { Endpoint } from './entities/endpoint.entity';
import { ApiKey } from './entities/api-key.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import * as crypto from 'crypto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectModel: typeof Project,
        @InjectModel(Endpoint) private endpointModel: typeof Endpoint,
        @InjectModel(ApiKey) private apiKeyModel: typeof ApiKey,
        private sequelize: Sequelize,
    ) { }

    async findAllProjects(userId: string) {
        return this.projectModel.findAll({
            where: { userId },
            include: [Endpoint],
        });
    }

    async findOneProject(userId: string, projectId: string) {
        const project = await this.projectModel.findOne({
            where: { id: projectId, userId },
            include: [Endpoint]
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return project;
    }

    async createProject(userId: string, createProjectDto: CreateProjectDto): Promise<any> {
        const transaction = await this.sequelize.transaction();

        try {
            const project = await this.projectModel.create({
                ...createProjectDto,
                userId,
            }, { transaction });

            const keyString = crypto.randomBytes(32).toString('hex');

            await this.apiKeyModel.create({
                name: 'Default Key',
                key: keyString,
                projectId: project.id,
            }, { transaction });

            await transaction.commit();

            return { ...project.dataValues, apiKey: keyString };

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async updateProject(userId: string, projectId: string, updateData: any) {
        const project = await this.findOneProject(userId, projectId);
        return project.update(updateData);
    }

    async deleteProject(userId: string, projectId: string) {
        const project = await this.findOneProject(userId, projectId);
        await project.destroy();
        return { message: 'Project deleted successfully', id: projectId };
    }


    //--- API KEYS ---
    async generateApiKey(userId: string, projectId: string, name?: string) {
        await this.findOneProject(userId, projectId);

        const keyString = crypto.randomBytes(32).toString('hex');
        return this.apiKeyModel.create({
            name: name || 'New Generated Key',
            key: keyString,
            projectId: projectId,
        });
    }

    //--- ENDPOINTS ---

    async findAllEndpoints(userId: string, projectId: string) {
        const project = await this.findOneProject(userId, projectId);
        return project.endpoints || [];
    }

    async createEndpoint(userId: string, projectId: string, createEndpointDto: CreateEndpointDto) {
        await this.findOneProject(userId, projectId);

        return this.endpointModel.create({
            ...createEndpointDto,
            projectId,
        });
    }
}