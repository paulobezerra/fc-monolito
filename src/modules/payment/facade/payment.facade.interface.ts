export interface InputSavePaymentFacadeDTO {
  id?: string;
  orderId: string;
  amount: number;
}
export interface OutputSavePaymentFacadeDTO {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default interface PaymentFacadeInterface {
  save(input: InputSavePaymentFacadeDTO): Promise<OutputSavePaymentFacadeDTO>;
}
