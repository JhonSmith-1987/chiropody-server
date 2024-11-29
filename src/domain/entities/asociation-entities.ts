import AccountEntity from "./account-entity";
import UserEntity from "./user-entity";
import ClientEntity from "./client-entity";
import ProviderEntity from "./provider-entity";
import CreditorEntity from "./creditor-entity";
import TransactionEntity from "./transaction-entity";
import AmountTotalEntity from "./amoun-total-entity";
import TransactionCreditorEntity from "./transaction-creditor-entity";
import AmountTotalCreditorEntity from "./amoun-total-creditor-entity";

// AccountEntity hasMany UserEntity
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

// AccountEntity hasMany ClientEntity
AccountEntity.hasMany(ClientEntity, {
    as: 'accountClients',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
ClientEntity.belongsTo(AccountEntity, {
    as: 'clientAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany ClientEntity
UserEntity.hasMany(ClientEntity, {
    as: 'userClients',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
ClientEntity.belongsTo(UserEntity, {
    as: 'clientUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany ProviderEntity
AccountEntity.hasMany(ProviderEntity, {
    as: 'accountProviders',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
ProviderEntity.belongsTo(AccountEntity, {
    as: 'providerAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany ProviderEntity
UserEntity.hasMany(ProviderEntity, {
    as: 'userProviders',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
ProviderEntity.belongsTo(UserEntity, {
    as: 'providerUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany CreditorEntity
AccountEntity.hasMany(CreditorEntity, {
    as: 'accountCreditors',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
CreditorEntity.belongsTo(AccountEntity, {
    as: 'creditorAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany CreditorEntity
UserEntity.hasMany(CreditorEntity, {
    as: 'userCreditors',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
CreditorEntity.belongsTo(UserEntity, {
    as: 'creditorUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany TransactionEntity
AccountEntity.hasMany(TransactionEntity, {
    as: 'accountTransactions',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
TransactionEntity.belongsTo(AccountEntity, {
    as: 'transactionAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany TransactionEntity
UserEntity.hasMany(TransactionEntity, {
    as: 'userTransactions',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
TransactionEntity.belongsTo(UserEntity, {
    as: 'transactionUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany AmountTotalEntity
AccountEntity.hasMany(AmountTotalEntity, {
    as: 'accountAmounts',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
AmountTotalEntity.belongsTo(AccountEntity, {
    as: 'amountAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany AmountTotalEntity
UserEntity.hasMany(AmountTotalEntity, {
    as: 'userAmounts',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
AmountTotalEntity.belongsTo(UserEntity, {
    as: 'amountUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany TransactionCreditorEntity
AccountEntity.hasMany(TransactionCreditorEntity, {
    as: 'accountTransactionCreditors',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
TransactionCreditorEntity.belongsTo(AccountEntity, {
    as: 'transactionCreditorAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany TransactionCreditorEntity
UserEntity.hasMany(TransactionCreditorEntity, {
    as: 'userTransactionCreditors',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
TransactionCreditorEntity.belongsTo(UserEntity, {
    as: 'transactionCreditorUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// CreditorEntity hasMany TransactionCreditorEntity
CreditorEntity.hasMany(TransactionCreditorEntity, {
    as: 'creditorTransactionCreditors',
    foreignKey: 'creditor_id',
    onDelete: 'CASCADE',
});
TransactionCreditorEntity.belongsTo(CreditorEntity, {
    as: 'transactionCreditorCreditor',
    foreignKey: 'creditor_id',
    onDelete: 'CASCADE',
});

// AccountEntity hasMany AmountTotalCreditorEntity
AccountEntity.hasMany(AmountTotalCreditorEntity, {
    as: 'accountAmountCreditors',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});
AmountTotalCreditorEntity.belongsTo(AccountEntity, {
    as: 'amountCreditorAccount',
    foreignKey: 'account_id',
    onDelete: 'CASCADE',
});

// UserEntity hasMany AmountTotalCreditorEntity
UserEntity.hasMany(AmountTotalCreditorEntity, {
    as: 'userAmountCreditors',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
AmountTotalCreditorEntity.belongsTo(UserEntity, {
    as: 'amountCreditorUser',
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// CreditorEntity hasMany AmountTotalCreditorEntity
CreditorEntity.hasMany(AmountTotalCreditorEntity, {
    as: 'creditorAmountCreditors',
    foreignKey: 'creditor_id',
    onDelete: 'CASCADE',
});
AmountTotalCreditorEntity.belongsTo(CreditorEntity, {
    as: 'amountCreditorCreditor',
    foreignKey: 'creditor_id',
    onDelete: 'CASCADE',
});