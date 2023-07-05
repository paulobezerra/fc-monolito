export default interface ProductGateway {
  findAll(): Promise<any>;
  find(id: string): Promise<any>;
}
