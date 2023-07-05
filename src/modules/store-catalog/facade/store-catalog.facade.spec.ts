import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from '../factory/facade.factory';
import ProductModel from "../repository/product.models";

describe("Store Catalog Facade unit tests", () => {
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

  it("should find all products", async () => {
    // Arrange
    const facade = StoreCatalogFacadeFactory.create();

    const product1 = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    };

    const product2 = {
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 20,
    };

    await ProductModel.create(product1);
    await ProductModel.create(product2);

    // Act
    const products = await facade.findAll();

    // Assert
    expect(products.products.length).toBe(2);
    expect(products.products[0].id).toBe("1");
    expect(products.products[0].name).toBe("Product 1");
    expect(products.products[0].description).toBe("Description 1");
    expect(products.products[0].salesPrice).toBe(10);
    expect(products.products[1].id).toBe("2");
    expect(products.products[1].name).toBe("Product 2");
    expect(products.products[1].description).toBe("Description 2");
    expect(products.products[1].salesPrice).toBe(20);
  });

  it("should find a product by id", async () => {
    // Arrange
    const facade = StoreCatalogFacadeFactory.create();

    const product1 = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    };

    await ProductModel.create(product1);

    // Act
    const product = await facade.find({id: "1"});

    // Assert
    expect(product.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(10);
  })
});
