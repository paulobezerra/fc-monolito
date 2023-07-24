import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice, { InvoiceProps } from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  InputAddInvoiceUseCaseDTO,
  OutputAddInvoiceUseCaseDTO,
} from "./add-invoice.usecase.dto";

export default class AddInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: InputAddInvoiceUseCaseDTO
  ): Promise<OutputAddInvoiceUseCaseDTO> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.city,
        input.state,
        input.zip
      ),
      items: input.items.map((item) => ({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
    } as InvoiceProps;

    const invoice = new Invoice(props);

    await this._invoiceRepository.add(invoice);

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
