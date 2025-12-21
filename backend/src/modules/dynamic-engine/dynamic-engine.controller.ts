import { Controller, All, Param, Req, Body, RequestMethod } from '@nestjs/common';
import { DynamicEngineService } from './dynamic-engine.service';
import { Request } from 'express';

@Controller('run')
export class DynamicEngineController {
    constructor(private readonly engineService: DynamicEngineService) { }

    //ALL gets GET; POST, PUT, DELETE and PATCH
    @All(':projectId/*')
    async handleRequest(
        @Param('projectId') projectId: string,
        @Req() req: Request,
        @Body() body: any
    ) {
        //req.params[0] contains the asterisk part of the path (everything after the /run)
        //Example: /run/123/users/create => projectId = 123, path = users/create
        const endpointPath = req.params[0];
        const method = req.method;

        return this.engineService.executeRequest(projectId, endpointPath, method, body);
    }
}