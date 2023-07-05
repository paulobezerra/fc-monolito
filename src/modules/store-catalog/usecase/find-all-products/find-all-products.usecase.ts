import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductsUsecase implements UseCaseInterface {
  private _repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this._repository = repository;
  }

  async execute(): Promise<FindAllProductsDto> {
    const products = await this._repository.findAll();

    return {
      products: products.map((product: Product) => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
