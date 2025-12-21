import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './entities/project.entity';
import { Endpoint } from './entities/endpoint.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateEndpointDto } from './dto/create-endpoint.dto';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectModel: typeof Project,
        @InjectModel(Endpoint) private endpointModel: typeof Endpoint,
    ) { }

    async findAllProjects(userId: string) {
        return this.projectModel.findAll({
            where: { userId },
            include: [Endpoint],
        })
    }

    async findOneProject(userId: string, projectId: string) {
        const project = await this.projectModel.findOne({
            where: { id: projectId, userId }, //WE VALIDATE USERID SO YOU CAN ONLY ACCESS TO YOU OWN PROJECTS
            include: [Endpoint]
        })

        if (!project) {
            throw new NotFoundException('Project not found')
        }

        return project
    }

    async createProject(userId: string, createProjectDto: CreateProjectDto) {
        const project = await this.projectModel.create({
            ...createProjectDto,
            userId,
        })

        return project
    }


    //--- ENDPOINTS ---
    async findAllEndpoints(userId: string, projectId: string) {
        //We validate the ownership of the project before listing
        await this.findOneProject(userId, projectId)

        return this.endpointModel.findAll({
            where: { projectId }
        })
    }

    async createEndpoint(userId: string, projectId: string, createEndpointDto: CreateEndpointDto) {
        //We verify that the project exists and its ownership
        const project = await this.findOneProject(userId, projectId);

        //Create the edpoint linked to the projectç
        return this.endpointModel.create({
            ...createEndpointDto,
            projectId,
        })
    }
}