export type Transaction = {
  toUUID: string;
  referenceNumber: string;
};

export type CreateTransactionRequest = {
  merchantUUID: string;
  descriptor: string;
  referenceNumber: string;
  amount: number;
  isImmediate?: boolean;
};

export type CreateTransactionResponse = {
  transactionUUID: string;
	merchantUUID: string;
	qrData: string;
	descriptor: string;
};
