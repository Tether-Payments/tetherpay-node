export type TransactionNonce = {
  walletAddress: string;
  nonce: string;
  country: string;
  approvedAt: string;
}

export type TransactionRecord = {
  type: number;
  toBlockIndex: number;
  fromBlockIndex: number;
  amount: number;
  timestamp: string;
}

export type Transaction = {
  createdAt: string;
  updatedAt: string;
  UUID: string;
  amount: number;
  merchantUUID: string;
  toAddress: string;
  fromAddress: string;
  descriptor: string;
  status: number;
  isImmediate: boolean;
  nonce: TransactionNonce;
  records: TransactionRecord[];
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
