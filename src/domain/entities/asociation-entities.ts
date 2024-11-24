import AccountEntity from "./account-entity";
import UserEntity from "./user-entity";

AccountEntity.hasMany(UserEntity, {
    as: 'accountUsers',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
UserEntity.belongsTo(AccountEntity, {
    as: 'userAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});