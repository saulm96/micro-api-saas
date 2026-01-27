import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DynamicEngineService } from "./dynamic-engine.service";
import { DynamicEngineController } from "./dynamic-engine.controller";
import { Project } from "../projects/entities/project.entity";
import { Endpoint } from '../projects/entities/endpoint.entity'
import { VirtualDbModule } from '../virtual-db/virtual-db.module'

@Module({
    imports: [
        SequelizeModule.forFeature([Project, Endpoint]),
        VirtualDbModule],
    controllers: [DynamicEngineController],
    providers: [DynamicEngineService],
    exports: [DynamicEngineService]

})

export class DynamicEngineModule { }