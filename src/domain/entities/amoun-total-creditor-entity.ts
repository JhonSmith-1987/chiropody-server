import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';
import {AmountTotalAttributes} from "./amoun-total-entity";


export interface AmountTotalCreditorAttributes extends AmountTotalAttributes {
    creditor_id: string;
}

export interface AmountTotalCreditorCreationAttributes extends Optional<AmountTotalCreditorAttributes, 'id'> {}

class AmountTotalCreditorEntity extends Model<AmountTotalCreditorAttributes, AmountTotalCreditorCreationAttributes> implements AmountTotalCreditorAttributes {
    public id!: string;
    public amount!: number;
    public user_id!: string;
    public account_id!: string;
    public creditor_id!: string;
}

AmountTotalCreditorEntity.init({
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
    creditor_id: {
        field: 'creditor_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'amount_total_creditor'
});

export default AmountTotalCreditorEntity;