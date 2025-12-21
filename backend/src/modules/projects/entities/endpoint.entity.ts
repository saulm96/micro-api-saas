import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Project } from './project.entity';

interface EndpointCreationAttrs {
    path: string;
    method: string;
    projectId: string;
    description?: string;
}

@Table({ tableName: 'endpoints', timestamps: true })
export class Endpoint extends Model<Endpoint, EndpointCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    path: string;

    @Column({
        type: DataType.ENUM('GET', 'POST', 'PUT', 'DELETE', 'PATCH'),
        defaultValue: 'GET'
    })
    method: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    description: string;

    @ForeignKey(() => Project)
    @Column({ type: DataType.UUID, allowNull: false })
    projectId: string;

    @BelongsTo(() => Project)
    project: Project;
}