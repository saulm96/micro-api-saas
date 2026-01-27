import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PublicApiController } from './public-api.controller';
import { DynamicEngineModule } from '../dynamic-engine/dynamic-engine.module';
import { ApiKey } from '../projects/entities/api-key.entity';

@Module({
  imports: [DynamicEngineModule, SequelizeModule.forFeature([ApiKey])],
  controllers: [PublicApiController],
})
export class PublicApiModule { }
