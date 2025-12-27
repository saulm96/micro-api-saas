import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../projects/entities/project.entity';
import { Endpoint, ActionType } from '../projects/entities/endpoint.entity';
import { VirtualDbService } from '../virtual-db/virtual-db.service';

@Injectable()
export class DynamicEngineService {
    constructor(
        @InjectModel(Project) private projectModel: typeof Project,
        @InjectModel(Endpoint) private endpointModel: typeof Endpoint,
        private virtualDbService: VirtualDbService,
    ) { }

    async executeRequest(projectId: string, path: string, method: string, body: any, query: any = {}) {
        // Validate project
        const project = await this.projectModel.findByPk(projectId);
        if (!project) throw new NotFoundException('Project not found');

        // Validate endpoint
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        const endpoint = await this.endpointModel.findOne({
            where: { projectId, path: cleanPath, method: method.toUpperCase() },
        });

        if (!endpoint) {
            throw new NotFoundException(`Endpoint ${method} ${cleanPath} not found`);
        }

        // Selector of logic (The Switch)
        switch (endpoint.actionType) {
            case ActionType.MOCK_RESPONSE:
                return this.handleMockResponse(endpoint.actionData);

            case ActionType.DB_INSERT:
                return this.handleDbInsert(projectId, endpoint.actionData, body);

            case ActionType.DB_SELECT:
                return this.handleDbSelect(projectId, endpoint.actionData, query);

            case ActionType.DB_UPDATE:
                return this.handleDbUpdate(projectId, endpoint.actionData, query, body);

            case ActionType.DB_DELETE:
                return this.handleDbDelete(projectId, endpoint.actionData, query);

            default:
                return { message: 'Acción no soportada todavía' };
        }
    }

    // Mock response logic
    private handleMockResponse(actionData: any) {
        const responseBody = actionData?.body || {};
        const statusCode = actionData?.statusCode || 200;
        return {
            _isMock: true,
            _statusCode: statusCode,
            data: responseBody,
        };
    }

    // Handle DB Insert logic in the virtual db
    private async handleDbInsert(projectId: string, actionData: any, reqBody: any) {
        const collectionName = actionData?.collection;

        if (!collectionName) {
            throw new BadRequestException('Configuración inválida: Falta "collection" en actionData');
        }

        const savedItem = await this.virtualDbService.insertItem(projectId, collectionName, reqBody);

        return {
            status: 'success',
            id: savedItem.id,
            collection: collectionName,
            data: savedItem.data,
            created_at: savedItem.createdAt,
        };
    }

    private async handleDbSelect(projectId: string, actionData: any, queryFilters: any) {
        const collectionName = actionData?.collection;

        if (!collectionName) {
            throw new BadRequestException('Configuración inválida: Falta "collection" en actionData');
        }

        const items = await this.virtualDbService.findAllItems(projectId, collectionName, queryFilters);

        return {
            collection: collectionName,
            count: items.length,
            filter_applied: queryFilters,
            results: items.map(item => ({
                id: item.id,
                data: item.data,
                created_at: item.createdAt
            }))
        };
    }
    private async handleDbUpdate(projectId: string, actionData: any, query: any, body: any) {
        const collectionName = actionData?.collection;
        const id = query?.id; // Esperamos ?id=XXXX

        if (!collectionName || !id) {
            throw new BadRequestException('Falta "collection" en config o "id" en los parámetros query');
        }

        const updatedItem = await this.virtualDbService.updateItem(projectId, collectionName, id, body);

        if (!updatedItem) {
            throw new NotFoundException('Item no encontrado para actualizar');
        }

        return {
            status: 'updated',
            id: updatedItem.id,
            data: updatedItem.data
        };
    }

    private async handleDbDelete(projectId: string, actionData: any, query: any) {
        const collectionName = actionData?.collection;
        const id = query?.id; // Esperamos ?id=XXXX

        if (!collectionName || !id) {
            throw new BadRequestException('Falta "collection" en config o "id" en los parámetros query');
        }

        const wasDeleted = await this.virtualDbService.deleteItem(projectId, collectionName, id);

        if (!wasDeleted) {
            throw new NotFoundException('Item no encontrado o ya borrado');
        }

        return {
            status: 'deleted',
            id: id
        };
    }
}