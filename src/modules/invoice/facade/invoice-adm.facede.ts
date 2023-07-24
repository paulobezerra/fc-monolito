import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceAdmFacadeInterface, {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./invoice-adm.facade.interface";

export interface UseCaseProps {
  addInvoiceUseCase: UseCaseInterface;
  findInvoiceUseCase: UseCaseInterface;
}

export default class InvoiceAdmFacade implements InvoiceAdmFacadeInterface {
  private _addInvoiceUseCase: UseCaseInterface;
  private _findInvoiceUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addInvoiceUseCase = props.addInvoiceUseCase;
    this._findInvoiceUseCase = props.findInvoiceUseCase;
  }

  async generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    return await this._addInvoiceUseCase.execute(input);
  }

  async find(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    return await this._findInvoiceUseCase.execute(input);
  }
}
