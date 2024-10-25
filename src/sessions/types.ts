export type Session = {
    uuid: number;
    userId: number;
  };
  
  export type NewSession = Omit<Session, "uuid">;