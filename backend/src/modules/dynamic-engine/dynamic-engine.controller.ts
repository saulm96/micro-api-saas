import { Controller, All, Param, Req, Body, Res } from '@nestjs/common';
import { DynamicEngineService } from './dynamic-engine.service';
import { Request, Response } from 'express';

@Controller('run')
export class DynamicEngineController {
    constructor(private readonly engineService: DynamicEngineService) { }

    @All(':projectId/*')
    async handleRequest(
        @Param('projectId') projectId: string,
        @Req() req: Request,
        @Res() res: Response, // Inject the Express response
        @Body() body: any,
    ) {
        const endpointPath = req.params[0];
        const method = req.method;

        const result = await this.engineService.executeRequest(projectId, endpointPath, method, body) as any;

        // If it's a mock, we extract the dynamic status code
        if (result._isMock) {
            return res.status(result._statusCode).json(result.data);
        }

        // Generic response for other cases
        return res.status(200).json(result);
    }
}