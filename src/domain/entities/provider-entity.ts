import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';
import {ClientAttributes} from "./client-entity";


export interface ProviderAttributes extends ClientAttributes {
    address: string;
    identification: string;
    start_date: number;
    user_id: string;
}

export interface ProviderCreationAttributes extends Optional<ProviderAttributes, 'id'> {}

class ProviderEntity extends Model<ProviderAttributes, ProviderCreationAttributes> implements ProviderAttributes {
    public id!: string;
    public name!: string;
    public address!: string;
    public phone!: string;
    public identification!: string;
    public start_date!: number;
    public account_id!: string;
    public user_id!: string;
}

ProviderEntity.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        field: 'address',
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        field: 'phone',
        type: DataTypes.STRING,
        allowNull: false,
    },
    identification: {
        field: 'identification',
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        field: 'start_date',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    account_id: {
        field: 'account_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
    user_id: {
        field: 'user_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'providers'
});

export default ProviderEntity;