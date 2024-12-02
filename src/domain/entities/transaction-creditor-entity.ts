import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';
import {TransactionAttributes} from "./transaction-entity";


export interface TransactionCreditorAttributes extends Omit<TransactionAttributes, 'transaction_data'|'transaction_id'>{
    creditor_id: string;
}

export interface TransactionCreditorCreationAttributes extends Optional<TransactionCreditorAttributes, 'id'> {}

class TransactionCreditorEntity extends Model<TransactionCreditorAttributes, TransactionCreditorCreationAttributes> implements TransactionCreditorAttributes {
    public id!: string;
    public date!: number;
    public amount!: number;
    public type!: string;
    public status!: string;
    public description!: string;
    public user_id!: string;
    public account_id!: string;
    public creditor_id!: string;
}

TransactionCreditorEntity.init({
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
    status: {
        field: 'status',
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        field: 'description',
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
    creditor_id: {
        field: 'creditor_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'transaction_creditors'
});

export default TransactionCreditorEntity;