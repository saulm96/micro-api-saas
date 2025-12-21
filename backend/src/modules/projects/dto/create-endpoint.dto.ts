import { IsNotEmpty, IsString, IsEnum, Matches, IsOptional, IsObject } from 'class-validator';
import { ActionType } from '../entities/endpoint.entity'; // Importamos el Enum

export class CreateEndpointDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^\/[a-zA-Z0-9\-\/_:]+$/, { message: 'El path debe empezar con / y ser una URL válida' })
    path: string;

    @IsNotEmpty()
    @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
    method: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(ActionType, { message: 'El actionType debe ser MOCK_RESPONSE, DB_INSERT o DB_QUERY' })
    actionType: ActionType;

    @IsOptional()
    @IsObject()
    actionData?: any;
}