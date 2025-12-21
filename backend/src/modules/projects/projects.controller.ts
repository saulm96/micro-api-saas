import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
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
}