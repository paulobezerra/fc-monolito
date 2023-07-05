import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { InputFindProductDto, OutputFindProductDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
  private _repository: ProductGateway;

  constructor(repository: ProductGateway) {
    this._repository = repository;
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this._repository.find(input.id);

    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
