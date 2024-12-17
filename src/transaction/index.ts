import { Base } from "../base.js";
import { CreateTransactionRequest, CreateTransactionResponse, Transaction } from "./types.js";

const resourceName = "transaction";

export class Transactions extends Base {
  
  async getTransactionById(id: number): Promise<Transaction> {
    const session = await this.request<Transaction>(`/${resourceName}/${id}`);
    return session;
  }

  async createTransaction(newTxn: CreateTransactionRequest) {
    const txn = await this.request<CreateTransactionResponse>(`/${resourceName}`, {
      method: "POST",
      body: JSON.stringify(newTxn),
    });
    return txn;
  }
}
