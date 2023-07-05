import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRespository from "../repository/product.respository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const repository = new ProductRespository();
    const addProductUseCase = new AddProductUseCase(repository);
    const checkStockUseCase = new CheckStockUseCase(repository);
    const facade = new ProductAdmFacade({
      addProductUseCase,
      checkStockUseCase,
    });

    return facade;
  }
}
