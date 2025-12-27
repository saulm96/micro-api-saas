import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from './entities/collection.entity';
import { CollectionItem } from './entities/collection-item.entity';

@Injectable()
export class VirtualDbService {
    constructor(
        @InjectModel(Collection) private collectionModel: typeof Collection,
        @InjectModel(CollectionItem) private itemModel: typeof CollectionItem,
    ) { }

    //Search for a collection by name and project, or create it if it doesn't exist
    async getOrCreateCollection(projectId: string, name: string) {
        const [collection] = await this.collectionModel.findOrCreate({
            where: { projectId, name },
            defaults: { projectId, name },
        });
        return collection;
    }

    // Insert a JSON data in a collection
    async insertItem(projectId: string, collectionName: string, data: any) {
        const collection = await this.getOrCreateCollection(projectId, collectionName);
        return this.itemModel.create({
            collectionId: collection.id,
            data: data,
        });
    }

    // (Optional for now) Read items for the future
    async findAllItems(projectId: string, collectionName: string, filters: any = {}) {
        const collection = await this.collectionModel.findOne({
            where: { projectId, name: collectionName },
        });

        if (!collection) return [];

        const whereClause: any = { collectionId: collection.id };

        if (Object.keys(filters).length > 0) {
            whereClause.data = filters;
        }

        return this.itemModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
        });
    }

    //UPDATE an item in a collection
    async updateItem(projectId: string, collectionName: string, id: string, newData: any) {
        const collection = await this.collectionModel.findOne({
            where: { projectId, name: collectionName },
        })
        if (!collection) return null;
        const item = await this.itemModel.findOne({
            where: { id, collectionId: collection.id }
        })
        if (!item) return null;
        return item.update({ data: newData });
    }

    //DELETE an item in a collection
    async deleteItem(projectId: string, collectionName: string, id: string): Promise<boolean> {
        const collection = await this.collectionModel.findOne({
            where: { projectId, name: collectionName },
        });

        if (!collection) return false;

        const deletedCount = await this.itemModel.destroy({
            where: { id, collectionId: collection.id },
        });

        return deletedCount > 0; // RETURNS TRUE IF DELETED
    }
}