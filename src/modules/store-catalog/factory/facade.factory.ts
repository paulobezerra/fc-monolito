import StoreCatalogFacade from "../facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";

export default class StoreCatalogFacadeFactory{

  static create(): StoreCatalogFacadeInterface {
    const repository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(repository);
    const findAllProductsUsecase = new FindAllProductsUsecase(repository);
    return new StoreCatalogFacade({
      findProductUseCase,
      findAllProductsUsecase,
    })
  }
}