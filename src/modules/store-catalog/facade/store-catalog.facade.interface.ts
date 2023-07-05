export interface InputFindStoreCatalogDto {
  id: string;
}

export interface OutputFindStoreCatalogDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface OutputFindAllStoreCatalogDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  find(input: InputFindStoreCatalogDto): Promise<OutputFindStoreCatalogDto>;
  findAll(): Promise<OutputFindAllStoreCatalogDto>;
}
