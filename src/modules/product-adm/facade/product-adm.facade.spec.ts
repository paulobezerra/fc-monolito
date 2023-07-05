import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from '../factory/facade.factory';
import ProductModel from "../repository/product.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";

describe("Product Adm Facade unit tests", () => {
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
    // Arrange
    const facade = ProductAdmFacadeFactory.create();
    
    const input = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10,
    };

    // Act
    await facade.addProduct(input);

    // Assert
    const produc = await ProductModel.findOne({
      where: { id: input.id },
    });
    expect(produc).toBeDefined();
    expect(produc?.id).toBe(input.id);
    expect(produc?.name).toBe(input.name);
    expect(produc?.description).toBe(input.description);
    expect(produc?.purchasePrice).toBe(input.purchasePrice);
    expect(produc?.stock).toBe(input.stock);
  });

  it("should check stock", async () => {
    // Arrange
    const facade = ProductAdmFacadeFactory.create();

    const product = await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      id: product.id,
    };

    // Act
    const result = await facade.checkStock(input);

    // Assert
    expect(result).toBeDefined;
    expect(result.productId).toBe(product.id);
    expect(result.stock).toBe(product.stock);
  });
});
