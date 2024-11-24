import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';


export interface AccountAttributes {
    id: string;
    name: string;
    address: string;
    phone: string;
    status: string;
    start_date: number;
    roll: string;
}

export interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {}

class AccountEntity extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
    public id!: string;
    public name!: string;
    public address!: string;
    public phone!: string;
    public status!: string;
    public roll!: string;
    public start_date!: number;
}

AccountEntity.init({
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
    status: {
        field: 'status',
        type: DataTypes.STRING,
        allowNull: false,
    },
    roll: {
        field: 'roll',
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        field: 'start_date',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'accounts'
});

export default AccountEntity;