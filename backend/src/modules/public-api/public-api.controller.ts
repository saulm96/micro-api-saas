import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { DynamicEngineService } from '../dynamic-engine/dynamic-engine.service';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('mock')
export class PublicApiController {
    constructor(private readonly engineService: DynamicEngineService) { }

    @All('*')
    @UseGuards(ApiKeyGuard)
    async handleRequest(@Req() req: any, @Res() res: any) {

        const projectId = req['project_id'];

        const cleanPath = req.path.replace(/.*\/mock/, '') || '/';

        try {
            const result = await this.engineService.executeRequest(
                projectId,
                cleanPath,
                req.method,
                req.body,
                req.query,
            ) as any;

            if (result._isMock) {
                return res.status(result._statusCode).json(result.data);
            }

            return res.status(200).json(result);
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                error: error.message || 'Internal Execution Error',
            });
        }
    }
}