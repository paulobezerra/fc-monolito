import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, { InputAddClientFacadeDTO, InputFindClientFacadeDTO, OutputFindClientFacadeDTO } from "./client-adm.facade.interface";

export interface UseCaseProps {
  addClientUseCase: UseCaseInterface;
  findClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addClientUseCase: UseCaseInterface;
  private _findClientUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addClientUseCase = props.addClientUseCase;
    this._findClientUseCase = props.findClientUseCase;
  }

  async add(input: InputAddClientFacadeDTO): Promise<void> {
    return await this._addClientUseCase.execute(input);
  }

  async find(input: InputFindClientFacadeDTO): Promise<OutputFindClientFacadeDTO> {
    return await this._findClientUseCase.execute(input);
  }
}
