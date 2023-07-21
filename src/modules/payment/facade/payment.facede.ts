import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  InputSavePaymentFacadeDTO,
  OutputSavePaymentFacadeDTO,
} from "./payment.facade.interface";

export interface UseCaseProps {
  processPaymentUseCase: UseCaseInterface;
}

export default class PaymentFacade implements ClientAdmFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._processPaymentUseCase = props.processPaymentUseCase;
  }

  async process(
    input: InputSavePaymentFacadeDTO
  ): Promise<OutputSavePaymentFacadeDTO> {
    return await this._processPaymentUseCase.execute(input);
  }
}
