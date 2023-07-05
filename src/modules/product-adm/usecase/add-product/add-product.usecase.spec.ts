import AddProductUseCase from "./add-product.usecase";

const MockProductRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Product Use Case unit tests", () => {
  it("should add a product", async () => {
    // Arrange
    const repository = MockProductRepository();
    const useCase = new AddProductUseCase(repository);
    const input = {
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10,
    };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});
