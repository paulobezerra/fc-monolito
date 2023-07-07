import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("123"),
  amount: 100,
  orderId: "123",
});

transaction.process();

const MockRepository = () => {
  return {
    save: jest.fn().mockResolvedValue(transaction),
  };
};

describe("Process Payment Use Case unit test", () => {
  it("should process payment", async () => {
    const PaymentGateway = MockRepository();
    const useCase = new ProcessPaymentUseCase(PaymentGateway);

    const input = {
      orderId: "123",
      amount: 100,
    };

    const result = await useCase.execute(input);

    expect(PaymentGateway.save).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.transactionId).toBe(transaction.id.value);
    expect(result.orderId).toBe(transaction.orderId);
    expect(result.amount).toBe(transaction.amount);
    expect(result.status).toBe("approved");
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });
});
