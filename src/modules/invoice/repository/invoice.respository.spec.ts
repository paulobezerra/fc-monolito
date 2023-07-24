import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceModel from "./invoice.model";
import InvoiceRespository from "./invoice.repository";
import ProductModel from "./product.model";

describe("Invoice Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ProductModel, InvoiceModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a invoice", async () => {
    const repository = new InvoiceRespository();
    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "00000000000",
      address: new Address(
        "Invoice 1 Street",
        123,
        "Invoice 1 City",
        "Invoice 1 State",
        "00000000"
      ),
      items: [
        {
          id: new Id("1"),
          name: "Product 1",
          price: 100,
        },
      ],
    });

    await repository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.value },
      include: "items",
    });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb?.id).toBe(invoice.id.value);
    expect(invoiceDb?.name).toBe(invoice.name);
    expect(invoiceDb?.document).toBe(invoice.document);
    expect(invoiceDb?.street).toBe(invoice.address.street);
    expect(invoiceDb?.number).toBe(invoice.address.number);
    expect(invoiceDb?.city).toBe(invoice.address.city);
    expect(invoiceDb?.state).toBe(invoice.address.state);
    expect(invoiceDb?.zip).toBe(invoice.address.zip);
    expect(invoiceDb?.createdAt).toEqual(invoice.createdAt);
    expect(invoiceDb?.updatedAt).toEqual(invoice.updatedAt);
    expect(invoiceDb?.items.length).toBe(1);
    expect(invoiceDb?.items[0].id).toBe(invoice.items[0].id?.value);
    expect(invoiceDb?.items[0].name).toBe(invoice.items[0].name);
    expect(invoiceDb?.items[0].price).toBe(invoice.items[0].price);
  });

  it("should find a invoice", async () => {
    const repository = new InvoiceRespository();
    const invoiceDb = await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "00000000000",
      street: "Invoice 1 Street",
      number: 123,
      city: "Invoice 1 City",
      state: "Invoice 1 State",
      zip: "00000000",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const productDb = await ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 100,
      invoiceId: invoiceDb.id,
    });

    const invoice = await repository.find(invoiceDb.id);

    expect(invoice).toBeDefined();
    expect(invoice.id.value).toBe(invoiceDb.id);
    expect(invoice.name).toBe(invoiceDb.name);
    expect(invoice.document).toBe(invoiceDb.document);
    expect(invoice.address.street).toBe(invoiceDb.street);
    expect(invoice.address.number).toBe(invoiceDb.number);
    expect(invoice.address.city).toBe(invoiceDb.city);
    expect(invoice.address.state).toBe(invoiceDb.state);
    expect(invoice.address.zip).toBe(invoiceDb.zip);
    expect(invoice.items.length).toBe(1);
    expect(invoice.items[0].id?.value).toBe(productDb.id);
    expect(invoice.items[0].name).toBe(productDb.name);
    expect(invoice.items[0].price).toBe(productDb.price);
    expect(invoice.id.value).toBe(productDb.invoiceId);
    expect(invoice.createdAt).toEqual(invoiceDb.createdAt);
    expect(invoice.updatedAt).toEqual(invoiceDb.updatedAt);
  });
});
