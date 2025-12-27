import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from './entities/collection.entity';
import { CollectionItem } from './entities/collection-item.entity';
import { VirtualDbService } from './virtual-db.service';

@Module({
    imports: [SequelizeModule.forFeature([Collection, CollectionItem])],
    providers: [VirtualDbService],
    exports: [VirtualDbService],
})
export class VirtualDbModule { }