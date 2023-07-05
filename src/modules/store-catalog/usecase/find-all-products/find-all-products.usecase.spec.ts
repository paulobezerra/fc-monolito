import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from './find-all-products.usecase';

const product1 = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 10,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Description 2",
  salesPrice: 20,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue(Promise.resolve([product1, product2])),
    find: jest.fn(),
  };
};

describe("Find All Products Usecase unit tests", () => {
  it("should find all products", async () => {
    // Arrange
    const repository = MockRepository();
    const usecase = new FindAllProductsUsecase(repository);

    // Act
    const result = await usecase.execute();

    // Assert
    expect(repository.findAll).toHaveBeenCalled();
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product 1");
    expect(result.products[0].description).toBe("Description 1");
    expect(result.products[0].salesPrice).toBe(10);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product 2");
    expect(result.products[1].description).toBe("Description 2");
    expect(result.products[1].salesPrice).toBe(20);

  });
});
