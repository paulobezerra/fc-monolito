export interface InputAddClientUseCaseDTO {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface OutputAddClientUseCaseDTO {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}