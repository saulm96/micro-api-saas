import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Project } from '../../projects/entities/project.entity';
import { CollectionItem } from './collection-item.entity';

interface CollectionCreationAttrs {
    name: string;
    projectId: string;
}

@Table({ tableName: 'virtual_collections', timestamps: true })
export class Collection extends Model<Collection, CollectionCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @ForeignKey(() => Project)
    @Column({ type: DataType.UUID, allowNull: false })
    projectId: string;

    @BelongsTo(() => Project)
    project: Project;

    @HasMany(() => CollectionItem)
    items: CollectionItem[];
}