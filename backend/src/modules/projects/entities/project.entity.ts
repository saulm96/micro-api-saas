import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany, AllowNull } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Endpoint } from './endpoint.entity';

interface ProjectCreationAttrs {
    name: string;
    userId: string;
    description?: string;
}

@Table({ tableName: 'projects', timestamps: true })
export class Project extends Model<Project, ProjectCreationAttrs> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    //USER REALATIONSHIP
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    //ENDPOINT RELATIONSHIP (ONE PROJECT CAN HAVE MANY ENDPOINTS)
    @HasMany(() => Endpoint)
    endpoints: Endpoint[];
}