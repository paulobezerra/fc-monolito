import PaymentFacadeInterface from "../facade/payment.facade.interface";
import PaymentFacade from "../facade/payment.facede";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const repository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(repository);
    const facade = new PaymentFacade({
      processPaymentUseCase,
    });

    return facade;
  }
}
