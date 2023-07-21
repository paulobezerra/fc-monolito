export interface InputSavePaymentFacadeDTO {
  orderId: string;
  amount: number;
}
export interface OutputSavePaymentFacadeDTO {
  transactionId?: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface PaymentFacadeInterface {
  process(input: InputSavePaymentFacadeDTO): Promise<OutputSavePaymentFacadeDTO>;
}
