import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  InputFindInvoiceUseCaseDTO,
  OutputFindInvoiceUseCaseDTO,
} from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: InputFindInvoiceUseCaseDTO
  ): Promise<OutputFindInvoiceUseCaseDTO> {
    const invoice = await this._invoiceRepository.find(input.id);
    return {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      city: invoice.address.city,
      state: invoice.address.state,
      zip: invoice.address.zip,
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
