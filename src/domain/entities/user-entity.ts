import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';


export interface UserAttributes {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    roll: string;
    start_date: number;
    account_id: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserEntity extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public phone!: string;
    public email!: string;
    public password!: string;
    public roll!: string;
    public start_date!: number;
    public account_id!: string;
}

UserEntity.init({
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
    phone: {
        field: 'phone',
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        field: 'email',
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        field: 'password',
        type: DataTypes.STRING(150),
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
    account_id: {
        field: 'account_id',
        type: DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'users'
});

export default UserEntity;