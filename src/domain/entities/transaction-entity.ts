import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';


export interface TransactionAttributes {
    id: string;
    date: number;
    amount: number;
    type: string;
    description: string;
    transaction_data: string;
    transaction_id: string;
    user_id: string;
    account_id: string;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class TransactionEntity extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
    public id!: string;
    public date!: number;
    public amount!: number;
    public type!: string;
    public description!: string;
    public transaction_data!: string;
    public transaction_id!: string;
    public user_id!: string;
    public account_id!: string;
}

TransactionEntity.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        field: 'date',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        field: 'amount',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        field: 'type',
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        field: 'description',
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_data: {
        field: 'transaction_data',
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_id: {
        field: 'transaction_id',
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        field: 'user_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
    account_id: {
        field: 'account_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'transactions'
});

export default TransactionEntity;