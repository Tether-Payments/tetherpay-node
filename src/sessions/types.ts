export type Session = {
  toUUID: string;
  referenceNumber: string;
};

export type CreateSessionRequest = {
  merchantUUID: string;
  descriptor: string;
  referenceNumber: string;
}

export type CreateSessionResponse = {
  sessionUUID: string;
  expiresAt: Date | string;
}
