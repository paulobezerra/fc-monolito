import { v4 } from "uuid";
import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice, { InvoiceProps } from "../../domain/invoice";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./add-invoice.usecase.dto";

export default class AddInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: new Id(v4()),
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.city,
        input.state,
        input.zipCode
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
      zipCode: invoice.address.zip,
      complement: invoice.address.complement,
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      total: invoice.items.reduce((total, item) => total + item.price, 0),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
