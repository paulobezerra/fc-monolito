import Id from '../../../@shared/domain/value-object/id.value-object';
import Product from '../../domain/product.entity';
import CheckStockUseCase from './check-stock.usecase';


const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  purchasePrice: 10,
  stock: 10
})

const MockProductRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(product),
  };
};

describe("Check Stock Use Case unit tests", () => {

  it("should check stock", async () => {
    // Arrange
    const repository = MockProductRepository();
    const input = {
      id: "1"
    };
    
    const useCase = new CheckStockUseCase(repository);

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(repository.find).toHaveBeenCalled();
    expect(result).toBeDefined;
    expect(result.productId).toBe(product.id.value);
    expect(result.stock).toBe(product.stock);
  });

});