import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import ProductRespository from './product.respository';
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Product Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a product", async () => {
    const repository = new ProductRespository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10
    });

    await repository.add(product);

    const productDb = await ProductModel.findOne({
      where: { id: product.id.value },
    });

    expect(productDb).toBeDefined();
    expect(productDb?.id).toBe(product.id.value);
    expect(productDb?.name).toBe(product.name);
    expect(productDb?.description).toBe(product.description);
    expect(productDb?.purchasePrice).toBe(product.purchasePrice);
    expect(productDb?.stock).toBe(product.stock);
  });

  it("should find a product", async () => {
    const repository = new ProductRespository();
    const product = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10
    });

    await repository.add(product);

    const productDb = await repository.find(product.id.value);

    expect(productDb).toBeDefined();
    expect(productDb?.id.value).toBe(product.id.value);
    expect(productDb?.name).toBe(product.name);
    expect(productDb?.description).toBe(product.description);
    expect(productDb?.purchasePrice).toBe(product.purchasePrice);
    expect(productDb?.stock).toBe(product.stock);
    expect(productDb?.createdAt).toEqual(product.createdAt);
    expect(productDb?.updatedAt).toEqual(product.updatedAt);
  });
});
