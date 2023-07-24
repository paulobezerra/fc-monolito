import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
  add(input: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
}
