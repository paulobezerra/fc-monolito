import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transactionApproved = new Transaction({
  id: new Id("123"),
  amount: 100,
  orderId: "123",
  status: "approved",
});

const transactionDeclined = new Transaction({
  id: new Id("123"),
  amount: 50,
  orderId: "123",
  status: "declined",
});

const MockRepository = () => ({
  save: jest.fn(),
});

describe("Process Payment Use Case unit test", () => {
  it("should process payment", async () => {
    const paymentGateway = MockRepository();
    paymentGateway.save.mockResolvedValueOnce(transactionApproved);
    const useCase = new ProcessPaymentUseCase(paymentGateway);

    const input = {
      orderId: "123",
      amount: 100,
    };

    const result = await useCase.execute(input);

    expect(paymentGateway.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.transactionId).toBe(transactionApproved.id.value);
    expect(result.orderId).toBe(transactionApproved.orderId);
    expect(result.amount).toBe(transactionApproved.amount);
    expect(result.status).toBe("approved");
    expect(result.createdAt).toBe(transactionApproved.createdAt);
    expect(result.updatedAt).toBe(transactionApproved.updatedAt);
  });

  it("should decline a transaction", async () => {
    const paymentGateway = MockRepository();
    paymentGateway.save.mockResolvedValueOnce(transactionDeclined);
    const useCase = new ProcessPaymentUseCase(paymentGateway);

    const input = {
      orderId: "123",
      amount: 50,
    };

    const result = await useCase.execute(input);

    expect(paymentGateway.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.transactionId).toBe(transactionDeclined.id.value);
    expect(result.orderId).toBe(transactionDeclined.orderId);
    expect(result.amount).toBe(transactionDeclined.amount);
    expect(result.status).toBe("declined");
    expect(result.createdAt).toBe(transactionDeclined.createdAt);
    expect(result.updatedAt).toBe(transactionDeclined.updatedAt);
  });
});
