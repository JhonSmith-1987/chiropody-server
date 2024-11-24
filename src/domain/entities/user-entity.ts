import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';


export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserEntity extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
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
}, {
    sequelize,
    tableName: 'users'
});

export default UserEntity;