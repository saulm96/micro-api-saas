import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Project } from './project.entity';


export enum ActionType {
    MOCK_RESPONSE = 'MOCK_RESPONSE',
    DB_INSERT = 'DB_INSERT',
    DB_QUERY = 'DB_QUERY',
}


interface EndpointCreationAttrs {
    path: string;
    method: string;
    projectId: string;
    description?: string;
    actionType: ActionType;
    actionData?: any;
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

    @Column({
        type: DataType.ENUM(...Object.values(ActionType)),
        defaultValue: ActionType.MOCK_RESPONSE,
        allowNull: false
    })
    actionType: ActionType;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    actionData: any;


    // ----------------------- RELATIONSHIPS -----------------------

    @ForeignKey(() => Project)
    @Column({ type: DataType.UUID, allowNull: false })
    projectId: string;

    @BelongsTo(() => Project)
    project: Project;
}