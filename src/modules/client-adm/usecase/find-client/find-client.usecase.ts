import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import {
  InputFindClientUseCaseDTO,
  OutputFindClientUseCaseDTO,
} from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(
    input: InputFindClientUseCaseDTO
  ): Promise<OutputFindClientUseCaseDTO> {
    const client = await this._clientRepository.find(input.id);
    return {
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}
