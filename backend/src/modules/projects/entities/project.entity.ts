import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Endpoint } from './endpoint.entity';
import { ApiKey } from './api-key.entity';

interface ProjectCreationAttrs {
    name: string;
    description?: string;
    userId: string;
}

@Table({ tableName: 'projects', timestamps: true })
export class Project extends Model<Project, ProjectCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @HasMany(() => Endpoint)
    endpoints: Endpoint[];

    @HasMany(() => ApiKey)
    apiKeys: ApiKey[];
}