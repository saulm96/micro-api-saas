import { IsNotEmpty, IsString, IsEnum, Matches, IsOptional, IsObject } from 'class-validator';
import { ActionType } from '../entities/endpoint.entity'; // Importamos el Enum

export class CreateEndpointDto {
    @IsNotEmpty()
    @IsString()
    @Matches(/^\/[a-zA-Z0-9\-\/_:]+$/, { message: 'Path must start with / and be a valid URL' })
    path: string;

    @IsNotEmpty()
    @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
    method: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsEnum(ActionType, { message: 'Please insert a valid action type format' })
    actionType: ActionType;

    @IsOptional()
    @IsObject()
    actionData?: any;
}