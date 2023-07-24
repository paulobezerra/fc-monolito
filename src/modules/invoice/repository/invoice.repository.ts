import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRespository implements InvoiceGateway {
  async add(input: Invoice): Promise<void> {
    const invoiceNew = await InvoiceModel.create({
      id: input.id.value,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      city: input.address.city,
      state: input.address.state,
      zip: input.address.zip,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    input.items.forEach(async (item) => {
      await ProductModel.create({
        id: item.id.value,
        name: item.name,
        price: item.price,
        invoiceId: invoiceNew.id,
      });
    });
  }
  async find(id: string): Promise<Invoice> {
    const invoiceDb = await InvoiceModel.findOne({
      where: { id },
      include: "items",
    });

    if (!invoiceDb) {
      throw new Error(`Invoice with ${id} not found`);
    }

    return new Invoice({
      id: new Id(invoiceDb.id),
      name: invoiceDb.name,
      document: invoiceDb.document,
      address: new Address(
        invoiceDb.street,
        invoiceDb.number,
        invoiceDb.city,
        invoiceDb.state,
        invoiceDb.zip
      ),
      items: invoiceDb.items.map((item) => ({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
      createdAt: invoiceDb.createdAt,
      updatedAt: invoiceDb.updatedAt,
    });
  }
}
