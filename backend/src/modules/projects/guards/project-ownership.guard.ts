import { CanActivate, ExecutionContext, Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "../entities/project.entity";

@Injectable()
export class ProjectOwnershipGuard implements CanActivate {
    constructor(
        @InjectModel(Project)
        private projectModel: typeof Project,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.id) {
            throw new ForbiddenException('User not authenticated');
        }

        const projectId = request.params.id || request.params.projectId;
        if (!projectId) {
            // If no projectId is provided, it's a global action (e.g., creating a project) 
            // TODO: CHECK IF THERE IS A BETTER OPTION FOR THIS IN THE FUTURE
            return true;
        }

        const project = await this.projectModel.findByPk(projectId);

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        if (project.userId !== user.id) {
            throw new ForbiddenException('You do not have permission to access this project!');
        }

        return true;
    }
}

