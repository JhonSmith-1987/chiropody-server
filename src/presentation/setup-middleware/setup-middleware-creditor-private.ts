import {UserRepository} from "../../infrastructure/repositories/user-repository";
import {UserService} from "../../domain/services/user-service";
import {AccountRepository} from "../../infrastructure/repositories/acccount-repository";
import {AmountTotalRepository} from "../../infrastructure/repositories/amount-total-repository";
import CreditorRouterPrivate from "../routes/creditor-router-private";
import {CreateCreditorUseCase} from "../../domain/use-cases/creditor/create-creditor-use-case";
import {CreditorService} from "../../domain/services/creditor-service";
import {CreditorRepository} from "../../infrastructure/repositories/creditor-repository";
import {AmountCreditorRepository} from "../../infrastructure/repositories/amount-creditor-repository";
import {PaginateSearchCreditorsUseCase} from "../../domain/use-cases/creditor/paginate-search-creditors-use-case";
import {CreditorByIdUseCase} from "../../domain/use-cases/creditor/creditor-by-id-use-case";
import {UpdateCreditorUseCase} from "../../domain/use-cases/creditor/update-creditor-use-case";

export function setupMiddlewareCreditorPrivate(
    userDataStore: UserRepository,
    accountDataStore: AccountRepository,
    amountTotalDataStore: AmountTotalRepository,
    creditorDataStore: CreditorRepository,
    amountCreditorDataStore: AmountCreditorRepository,
) {
    return CreditorRouterPrivate(
        new CreateCreditorUseCase(new CreditorService(creditorDataStore, amountCreditorDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
        new PaginateSearchCreditorsUseCase(new UserService(userDataStore, accountDataStore, amountTotalDataStore), new CreditorService(creditorDataStore, amountCreditorDataStore)),
        new CreditorByIdUseCase(new CreditorService(creditorDataStore, amountCreditorDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
        new UpdateCreditorUseCase(new CreditorService(creditorDataStore, amountCreditorDataStore), new UserService(userDataStore, accountDataStore, amountTotalDataStore)),
    );
}