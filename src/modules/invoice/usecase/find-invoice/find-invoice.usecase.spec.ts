import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("123"),
  name: "John Doe",
  document: "12345678901",
  address: new Address("John Doe Street", 123, "John Doe City", "JD", "12345"),
  items: [
    {
      id: new Id("1"),
      name: "Product 1",
      price: 100,
    },
    {
      id: new Id("2"),
      name: "Product 2",
      price: 200,
    },
  ],
  createdAt: new Date(),
});

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(invoice),
    add: jest.fn(),
  };
};

describe("Find Invoice Usecase unit tests", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const result = await usecase.execute({ id: invoice.id.value });

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id.value);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.city).toBe(invoice.address.city);
    expect(result.state).toBe(invoice.address.state);
    expect(result.zip).toBe(invoice.address.zip);
    expect(result.items[0].id).toBe(invoice.items[0].id?.value);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
  });
});
