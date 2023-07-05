import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, {
  InputFindStoreCatalogDto,
  OutputFindAllStoreCatalogDto,
  OutputFindStoreCatalogDto,
} from "./store-catalog.facade.interface";

export interface StoreCatalogFacadeProps {
  findProductUseCase: FindProductUseCase;
  findAllProductsUsecase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findProductUseCase: FindProductUseCase;
  private _findAllProductsUsecase: FindAllProductsUsecase;

  constructor(props: StoreCatalogFacadeProps) {
    this._findProductUseCase = props.findProductUseCase;
    this._findAllProductsUsecase = props.findAllProductsUsecase;
  }

  async find(
    input: InputFindStoreCatalogDto
  ): Promise<OutputFindStoreCatalogDto> {
    return await this._findProductUseCase.execute(input);
  }
  
  async findAll(): Promise<OutputFindAllStoreCatalogDto> {
    return await this._findAllProductsUsecase.execute();
  }
}
