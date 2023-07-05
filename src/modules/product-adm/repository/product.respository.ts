import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRespository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.value,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<Product> {
    const productDb = await ProductModel.findOne({
      where: { id },
    });

    if (!productDb) {
      throw new Error(`Product with ${id} not found`);
    }

    return new Product({
      id: new Id(productDb.id),
      name: productDb.name,
      description: productDb.description,
      purchasePrice: productDb.purchasePrice,
      stock: productDb.stock,
      createdAt: productDb.createdAt,
      updatedAt: productDb.updatedAt,
    });
  }
}
