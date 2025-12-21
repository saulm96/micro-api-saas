import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DynamicEngineService } from "./dynamic-engine.service";
import { DynamicEngineController } from "./dynamic-engine.controller";
import { Project } from "../projects/entities/project.entity";
import { Endpoint } from '../projects/entities/endpoint.entity'


@Module({
    imports: [SequelizeModule.forFeature([Project, Endpoint])],
    controllers: [DynamicEngineController],
    providers: [DynamicEngineService]

})

export class DynamicEngineModule { }