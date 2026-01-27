import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ApiKey } from "../../projects/entities/api-key.entity";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        @InjectModel(ApiKey)
        private apiKeyModel: typeof ApiKey,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const apiKey = request.headers['x-api-key'];
        if (!apiKey) {
            throw new UnauthorizedException('Missing x-api-key header');
        }

        const keyRecord = await this.apiKeyModel.findOne({ where: { key: apiKey } });
        if (!keyRecord) {
            throw new UnauthorizedException('Invalid x-api-key header');
        }

        request['project_id'] = keyRecord.projectId;
        return true;
    }
}