import { DataTypes, Model, Optional } from "sequelize";
import {sequelize} from '../../infrastructure/config/sequelizeConfig';

export type RoleType = 'admin' | 'customer' | 'super_admin';

export interface UserAttributes {
    id: string;
    full_name: string;
    identification: string;
    date_birth: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    registration_date: number;
    role: RoleType;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class UserEntity extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public full_name!: string;
    public identification!: string;
    public date_birth!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public gender!: string;
    public registration_date!: number;
    public role!: RoleType;
}

UserEntity.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    full_name: {
        field: 'full_name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    identification: {
        field: 'identification',
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_birth: {
        field: 'date_birth',
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
    phone: {
        field: 'phone',
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        field: 'gender',
        type: DataTypes.STRING,
        allowNull: false,
    },
    registration_date: {
        field: 'registration_date',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        field: 'role',
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users'
});

export default UserEntity;