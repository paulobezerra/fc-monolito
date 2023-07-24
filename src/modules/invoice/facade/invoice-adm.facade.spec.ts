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
      name: "Invoice 1",
      document: "00000000000",
      street: "Invoice 1 Street",
      number: "123",
      city: "Invoice 1 City",
      state: "Invoice 1 State",
      zipCode: "00000000",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
      ],
    };

    // Act
    const result = await facade.generate(input);

    // Assert
    const invoice = await InvoiceModel.findOne({
      where: { id: result.id },
      include: "items",
    });

    expect(invoice).toBeDefined();
    expect(invoice?.id).toBe(result.id);
    expect(invoice?.name).toBe(result.name);
    expect(invoice?.document).toBe(result.document);
    expect(invoice?.street).toBe(result.street);
    expect(invoice?.number).toBe(result.number);
    expect(invoice?.city).toBe(result.city);
    expect(invoice?.state).toBe(result.state);
    expect(invoice?.zip).toBe(result.zipCode);
    expect(invoice?.items[0].id).toBe(result.items[0].id);
    expect(invoice?.items[0].name).toBe(result.items[0].name);
    expect(invoice?.items[0].price).toBe(result.items[0].price);
    expect(result.total).toBe(100);
  });

  it("should find a Invoice", async () => {
    // Arrange
    const facade = InvoiceAdmFacadeFactory.create();

    const invoice = await InvoiceModel.create({
      id: "1",
      name: "Invoice 1",
      document: "00000000000",
      street: "Invoice 1 Street",
      number: "123",
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
    expect(result.address.street).toBe(invoice.street);
    expect(result.address.number).toBe(invoice.number);
    expect(result.address.city).toBe(invoice.city);
    expect(result.address.state).toBe(invoice.state);
    expect(result.address.zipCode).toBe(invoice.zip);
    expect(result.items[0].id).toBe(item.id);
    expect(result.items[0].name).toBe(item.name);
    expect(result.items[0].price).toBe(item.price);
  });
});
