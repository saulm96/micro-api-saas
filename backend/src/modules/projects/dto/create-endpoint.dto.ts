import { IsNotEmpty, IsString, IsEnum, Matches, IsOptional } from 'class-validator';

export class CreateEndpointDto {
    @IsNotEmpty()
    @IsString()
    //REGEX FOR VALIDATING PATH (STARTS WITH / AND ONLY CONTAINS /, a-z, A-Z, 0-9, -)
    @Matches(/^\/[a-zA-Z0-9\-\/_:]+$/, { message: 'Path must start with / and be a valid URL (e.g: /users)' })
    path: string;

    @IsNotEmpty()
    @IsEnum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
    method: string;

    @IsOptional()
    @IsString()
    description?: string;
}