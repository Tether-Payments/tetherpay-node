export type Session = {
  toUUID: string;
  referenceNumber: string;
};

export type CreateSessionRequest = {
  toUUID: string;
  referenceNumber: string;
}

export type CreateSessionResponse = {
  sessionUUID: string;
  // TODO: define this type exactly
  expiresAt: Date | string;
}

// export type NewSession = Omit<Session, "uuid">;