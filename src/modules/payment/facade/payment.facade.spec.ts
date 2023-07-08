import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from '../factory/facade.factory';
import e from "express";

describe("Payment Facade unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a transaction", async () => {
    // Arrange
    const facade = PaymentFacadeFactory.create();
    
    const input = {
      id: "1",
      orderId: "1",
      amount: 100,
    };

    // Act
    const transaction = await facade.save(input);

    console.log(transaction)

    // Assert
    expect(transaction).toBeDefined();
    expect(transaction?.transactionId).toBe(input.id);
    expect(transaction?.orderId).toBe(input.orderId);
    expect(transaction?.amount).toBe(input.amount);
    expect(transaction?.status).toBe("approved");
    expect(transaction?.createdAt).toBeDefined();
    expect(transaction?.updatedAt).toBeDefined();
  });
});