import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
} from "./product-adm.facade.interface";

export interface UseCaseProps {
  addProductUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addProductUseCase = props.addProductUseCase;
    this._checkStockUseCase = props.checkStockUseCase;
  }

  async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    return await this._addProductUseCase.execute(input);
  }

  async checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    return await this._checkStockUseCase.execute(input);
  }
}
