import { Controller, All, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiKey } from '../projects/entities/api-key.entity';
import { DynamicEngineService } from '../dynamic-engine/dynamic-engine.service';

@Controller('mock')
export class PublicApiController {
    constructor(
        @InjectModel(ApiKey) private apiKeyModel: typeof ApiKey,
        private readonly engineService: DynamicEngineService
    ) { }

    @All('*')
    async handleRequest(@Req() req: any, @Res() res: any) {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) return res.status(401).json({ error: 'Missing x-api-key header' });

        const keyRecord = await this.apiKeyModel.findOne({ where: { key: apiKey } });
        if (!keyRecord) return res.status(401).json({ error: 'Invalid API Key' });

        const cleanPath = req.path.replace(/.*\/mock/, '') || '/';

        try {
            const result = await this.engineService.executeRequest(
                keyRecord.projectId,
                cleanPath,
                req.method,
                req.body,
                req.query
            ) as any;

            if (result._isMock) {
                return res.status(result._statusCode).json(result.data);
            }

            return res.status(200).json(result);

        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json({
                error: error.message || 'Internal Execution Error'
            });
        }
    }
}