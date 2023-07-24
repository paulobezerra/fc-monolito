export interface InputAddInvoiceUseCaseDTO {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: number;
  city: string;
  state: string;
  zip: string;
  items: {
    id?: string;
    name: string;
    price: number;
  }[];
}

export interface OutputAddInvoiceUseCaseDTO {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: number;
  city: string;
  state: string;
  zip: string;
  items: {
    id?: string;
    name: string;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
