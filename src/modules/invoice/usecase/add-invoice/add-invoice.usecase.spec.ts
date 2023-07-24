import AddInvoiceUseCase from "./add-invoice.usecase";
import { GenerateInvoiceUseCaseInputDto } from "./add-invoice.usecase.dto";
const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
};

describe("Add Invoice Usecase unit tests", () => {
  it("should add a invoice", async () => {
    const repository = MockRepository();
    const usecase = new AddInvoiceUseCase(repository);

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
    } as GenerateInvoiceUseCaseInputDto;

    const result = await usecase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.total).toBe(100);
  });
});
