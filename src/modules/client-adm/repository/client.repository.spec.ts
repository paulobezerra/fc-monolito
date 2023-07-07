import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientModel from "./client.model";
import Client from "../domain/client.entity";
import e from "express";
import ClientRespository from "./client.repository";

describe("Client Repository unit tests", () => {
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
    const repository = new ClientRespository();
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 Street, 123",
    });

    await repository.add(client);

    const clientDb = await ClientModel.findOne({
      where: { id: client.id.value },
    });

    expect(clientDb).toBeDefined();
    expect(clientDb?.id).toBe(client.id.value);
    expect(clientDb?.name).toBe(client.name);
    expect(clientDb?.email).toBe(client.email);
    expect(clientDb?.address).toBe(client.address);
    expect(clientDb?.createdAt).toEqual(client.createdAt);
    expect(clientDb?.updatedAt).toEqual(client.updatedAt);
  });

  it("should find a product", async () => {
    const repository = new ClientRespository();
    const clientDb = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@email.com",
      address: "Client 1 Street, 123",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = await repository.find(clientDb.id);

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.value);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.address).toBe(client.address);
    expect(clientDb.createdAt).toEqual(client.createdAt);
    expect(clientDb.updatedAt).toEqual(client.updatedAt);
  });
});
