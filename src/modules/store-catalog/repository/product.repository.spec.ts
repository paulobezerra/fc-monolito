import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.models";
import ProductRepository from "./product.repository";

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

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 20,
    });

    const repository = new ProductRepository();

    const products = await repository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.value).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
    expect(products[0].salesPrice).toBe(10);
    expect(products[1].id.value).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Description 2");
    expect(products[1].salesPrice).toBe(20);
  });

  it("should find a product by id", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 10,
    });

    const repository = new ProductRepository();

    const product = await repository.find("1");

    expect(product?.id.value).toBe("1");
    expect(product?.name).toBe("Product 1");
    expect(product?.description).toBe("Description 1");
    expect(product?.salesPrice).toBe(10);
  })
});
