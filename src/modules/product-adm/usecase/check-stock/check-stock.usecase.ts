import ProductGateway from "../../gateway/product.gateway";
import { InputCheckStockDto, OutputCheckStockDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  async execute(input: InputCheckStockDto): Promise<OutputCheckStockDto> {
    const product = await this.productGateway.find(input.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      productId: product.id.value,
      stock: product.stock,
    };
  }
}
