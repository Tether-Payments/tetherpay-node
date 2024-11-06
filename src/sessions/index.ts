import { Base } from "../base";
import { CreateSessionRequest, CreateSessionResponse, Session } from "./types";

const resourceName = "sessions";

export class Sessions extends Base {
  
  // TODO: update this method in the future
  async getSessionById(id: number): Promise<Session> {
    const session = await this.request<Session>(`/${resourceName}/${id}`);
    return session;
  }

  async createSession(newSession: CreateSessionRequest) {
    const session = await this.request<CreateSessionResponse>(`/${resourceName}`, {
      method: "POST",
      body: JSON.stringify(newSession),
    });
    return session;
  }
}