import InvoiceAdmFacadeInterface from "../facade/invoice-adm.facade.interface";
import InvoiceAdmFacade from "../facade/invoice-adm.facede";
import InvoiceRespository from "../repository/invoice.repository";
import AddInvoiceUseCase from "../usecase/add-invoice/add-invoice.usecase";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";

export default class InvoiceAdmFacadeFactory {
  static create(): InvoiceAdmFacadeInterface {
    const repository = new InvoiceRespository();
    const addInvoiceUseCase = new AddInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceAdmFacade({
      addInvoiceUseCase,
      findInvoiceUseCase,
    });

    return facade;
  }
}
