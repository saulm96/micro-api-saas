import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../projects/entities/project.entity';
import { Endpoint } from '../projects/entities/endpoint.entity';

@Injectable()
export class DynamicEngineService {
    constructor(
        @InjectModel(Project) private projectModel: typeof Project,
        @InjectModel(Endpoint) private endpointModel: typeof Endpoint
    ) { }

    async executeRequest(projectId: string, path: string, method: string, body: any) {
        const project = await this.projectModel.findByPk(projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        //Normalize the path before matching so will always start with /
        const cleanPath = path.startsWith('/') ? path : '/' + path;

        //Search specific endpoint
        const endpoint = await this.endpointModel.findOne({
            where: {
                projectId: project.id,
                path: cleanPath,
                method: method.toUpperCase()
            }
        });

        if (!endpoint) {
            throw new BadRequestException(`Endpoint ${method.toUpperCase()} ${cleanPath} not found`);
        }

        //TODO:  Real logic here (Save in DB, send email, etc)
        return {
            status: 'success',
            meta: {
                project: project.name,
                endpoint: endpoint.path,
                method: endpoint.method,
                timestamp: new Date()
            },
            data: {
                message: 'API PERFECTLY WORKING!!!!!',
                received_body: body,
            }
        }
    }
}