import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";


export default class ClientRespository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.value,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
  }

  async find(id: string): Promise<Client> {
    const productDb = await ClientModel.findOne({
      where: { id },
    });

    if (!productDb) {
      throw new Error(`Client with ${id} not found`);
    }

    return new Client({
      id: new Id(productDb.id),
      name: productDb.name,
      email: productDb.email,
      address: productDb.address,
      createdAt: productDb.createdAt,
      updatedAt: productDb.updatedAt,
    });
  }
}
