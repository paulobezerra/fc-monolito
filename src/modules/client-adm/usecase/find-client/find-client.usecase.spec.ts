import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from './find-client.usecase';

const client = new Client({
  id: new Id("123"),
  name: "John Doe",
  email: "john@email.com",
  address: "John Doe Street, 123"
});

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(client),
    add: jest.fn(),
  };
};

describe("Find Client Usecase unit tests", () => {
  it("should find a client", async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const result = await usecase.execute({id: client.id.value});

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.value);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.address).toBe(client.address);
    expect(result.createdAt).toBe(client.createdAt);
    expect(result.updatedAt).toBe(client.updatedAt);
  });
});