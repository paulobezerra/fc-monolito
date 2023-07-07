import ClientAdmFacadeInterface from "../facade/client-adm.facade.interface";
import ClientAdmFacade from "../facade/client-adm.facede";
import ClientRespository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class CleintAdmFacadeFactory {
  static create(): ClientAdmFacadeInterface {
    const repository = new ClientRespository();
    const addClientUseCase = new AddClientUseCase(repository);
    const findClientUseCase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addClientUseCase,
      findClientUseCase,
    });

    return facade;
  }
}
