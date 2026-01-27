import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Project } from './project.entity';

interface ApiKeyCreationAttrs {
    name: string;
    key: string;
    projectId: string;
}

@Table({ tableName: 'api_keys', timestamps: true })
export class ApiKey extends Model<ApiKey, ApiKeyCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ unique: true, allowNull: false })
    key: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @ForeignKey(() => Project)
    @Column({ type: DataType.UUID, allowNull: false })
    projectId: string;

    @BelongsTo(() => Project)
    project: Project;
}