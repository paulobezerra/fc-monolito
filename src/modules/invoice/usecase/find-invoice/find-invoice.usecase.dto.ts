export interface InputFindInvoiceUseCaseDTO {
  id: string;
}

export interface OutputFindInvoiceUseCaseDTO {
  id: string;
  name: string;
  document: string;
  street: string;
  number: number;
  city: string;
  state: string;
  zip: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
