import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Collection } from './collection.entity';

interface CollectionItemCreationAttrs {
    data: any;
    collectionId: string;
}

@Table({ tableName: 'virtual_collection_items', timestamps: true })
export class CollectionItem extends Model<CollectionItem, CollectionItemCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    data: any;

    @ForeignKey(() => Collection)
    @Column({ type: DataType.UUID, allowNull: false })
    collectionId: string;

    @BelongsTo(() => Collection)
    collection: Collection;
}