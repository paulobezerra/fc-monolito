import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientModel from '../repository/client.model';
import ClientAdmFacadeFactory from '../factory/facade.factory';
import Client from '../domain/client.entity';

describe("Client Adm Facade unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a client", async () => {
    // Arrange
    const facade = ClientAdmFacadeFactory.create();
    
    const input = {
      id: "1",
      name: "Client 1",
      email: "teste@email.com",
      address: "Address 1",
    };

    // Act
    await facade.add(input);

    // Assert
    const client = await ClientModel.findOne({
      where: { id: input.id },
    });
    expect(client).toBeDefined();
    expect(client?.id).toBe(input.id);
    expect(client?.name).toBe(input.name);
    expect(client?.email).toBe(input.email);
    expect(client?.address).toBe(input.address);
  });

  it("should find a client", async () => {
    // Arrange
    const facade = ClientAdmFacadeFactory.create();

    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "email@client.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      id: client.id,
    };

    // Act
    const result = await facade.find(input);

    // Assert
    expect(result).toBeDefined;
    expect(result.id).toBe(client.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
  });
});
