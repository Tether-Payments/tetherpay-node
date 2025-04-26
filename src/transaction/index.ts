import { Base } from '../base.js';
import { CreateTransactionRequest, CreateTransactionResponse, Transaction } from './types.js';

const resourceName = "transaction";

export class Transactions extends Base {
  
  async getTransactionByUUID(UUID: string): Promise<Transaction> {
    return await this.request<Transaction>(`/${resourceName}/${UUID}`);
  }

  async createTransaction(newTxn: CreateTransactionRequest) {
    const txn = await this.request<CreateTransactionResponse>(`/${resourceName}`, {
      method: "POST",
      body: JSON.stringify(newTxn),
    });
    return txn;
  }
}
