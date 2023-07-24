export interface InputAddInvoiceFacadeDTO {
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

export interface InputFindInvoiceFacadeDTO {
  id: string;
}

export interface OutputFindInvoiceFacadeDTO {
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

export default interface InvoiceAdmFacadeInterface {
  add(input: InputAddInvoiceFacadeDTO): Promise<void>;
  find(input: InputFindInvoiceFacadeDTO): Promise<OutputFindInvoiceFacadeDTO>;
}
