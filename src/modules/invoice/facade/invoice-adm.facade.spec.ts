import { Sequelize } from "sequelize-typescript";
import InvoiceAdmFacadeFactory from "../factory/facade.factory";
import InvoiceModel from "../repository/invoice.model";
import ProductModel from "../repository/product.model";

describe("Invoice Adm Facade unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a Invoice", async () => {
    // Arrange
    const facade = InvoiceAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "00000000000",
      street: "Invoice 1 Street",
      number: 123,
      city: "Invoice 1 City",
      state: "Invoice 1 State",
      zip: "00000000",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
      ],
    };

    // Act
    await facade.add(input);

    // Assert
    const invoice = await InvoiceModel.findOne({
      where: { id: input.id },
      include: "items",
    });

    expect(invoice).toBeDefined();
    expect(invoice?.id).toBe(input.id);
    expect(invoice?.name).toBe(input.name);
    expect(invoice?.document).toBe(input.document);
    expect(invoice?.street).toBe(input.street);
    expect(invoice?.number).toBe(input.number);
    expect(invoice?.city).toBe(input.city);
    expect(invoice?.state).toBe(input.state);
    expect(invoice?.zip).toBe(input.zip);
    expect(invoice?.items[0].id).toBe(input.items[0].id);
    expect(invoice?.items[0].name).toBe(input.items[0].name);
    expect(invoice?.items[0].price).toBe(input.items[0].price);
  });

  it("should find a Invoice", async () => {
    // Arrange
    const facade = InvoiceAdmFacadeFactory.create();

    const invoice = await InvoiceModel.create({
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

    const item = await ProductModel.create({
      id: "1",
      name: "Product 1",
      price: 100,
      invoiceId: invoice.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      id: invoice.id,
    };

    // Act
    const result = await facade.find(input);

    // Assert
    expect(result).toBeDefined;
    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.street);
    expect(result.number).toBe(invoice.number);
    expect(result.city).toBe(invoice.city);
    expect(result.state).toBe(invoice.state);
    expect(result.zip).toBe(invoice.zip);
    expect(result.items[0].id).toBe(item.id);
    expect(result.items[0].name).toBe(item.name);
    expect(result.items[0].price).toBe(item.price);
  });
});
