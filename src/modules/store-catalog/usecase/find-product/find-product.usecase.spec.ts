import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCase from "./find-product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 10,
});

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(Promise.resolve(product)),
  };
};

describe("Product Repository unit tests", () => {
  it("should find a product", async () => {
    // Arrange
    const repository = MockRepository();
    const usecase = new FindProductUseCase(repository);
    const input = { id: product.id.value };

    // Act
    const result = await usecase.execute(input);

    // Assert
    expect(repository.find).toHaveBeenCalledWith("1");
    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description 1");
    expect(result.salesPrice).toBe(10);
  });
});
