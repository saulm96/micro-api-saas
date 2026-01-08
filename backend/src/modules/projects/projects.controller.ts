import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateEndpointDto } from './dto/create-endpoint.dto';


@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    // CREATE PROJECT
    //POST /api/v1/projects
    @Post()
    createProject(@Request() req: any, @Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.createProject(req.user.id, createProjectDto);
    }

    // GET ALL PROJECTS
    // GET /api/v1/projects
    @Get()
    findAllProjects(@Request() req: any) {
        return this.projectsService.findAllProjects(req.user.id);
    }

    //UPDATE name and description of project
    //PATCH /api/v1/projects/:id
    @Patch(':id')
    updateProject(
        @Request() req: any,
        @Param('id') id: string,
        @Body() updateData: any // Ideally use UpdateProjectDto
    ) {
        return this.projectsService.updateProject(req.user.id, id, updateData);
    }

    // DELETE PROJECT
    // DELETE /api/v1/projects/:id
    @Delete(':id')
    deleteProject(@Request() req: any, @Param('id') id: string) {
        return this.projectsService.deleteProject(req.user.id, id);
    }

    // CREATE ENDPOINT
    // POST /api/v1/projects/:projectId/endpoints
    @Post(':projectId/endpoints')
    createEndpoint(
        @Request() req: any,
        @Param('projectId') projectId: string,
        @Body() createEndpointDto: CreateEndpointDto,
    ) {
        return this.projectsService.createEndpoint(req.user.id, projectId, createEndpointDto);
    }

    //  GET ENDPOINTS
    // GET /api/v1/projects/:projectId/endpoints
    @Get(':projectId/endpoints')
    findAllEndpoints(
        @Request() req: any,
        @Param('projectId') projectId: string,
    ) {
        return this.projectsService.findAllEndpoints(req.user.id, projectId);
    }

    @Post(':projectId/keys')
    async createApiKey(
        @Request() req: any,
        @Param('projectId') projectId: string,
        @Body('name') name: string,
    ) {
        return this.projectsService.generateApiKey(req.user.id, projectId, name || 'Sin nombre');
    }
}