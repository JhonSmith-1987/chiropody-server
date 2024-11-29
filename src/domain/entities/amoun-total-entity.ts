import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';


export interface AmountTotalAttributes {
    id: string;
    amount: number;
    user_id: string;
    account_id: string;
}

export interface AmountTotalCreationAttributes extends Optional<AmountTotalAttributes, 'id'> {}

class AmountTotalEntity extends Model<AmountTotalAttributes, AmountTotalCreationAttributes> implements AmountTotalAttributes {
    public id!: string;
    public amount!: number;
    public user_id!: string;
    public account_id!: string;
}

AmountTotalEntity.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    amount: {
        field: 'amount',
        type: DataTypes.INTEGER,
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
    tableName: 'amount_total'
});

export default AmountTotalEntity;