import { Base } from "../base";
import { NewSession, Session } from "./types";

const resourceName = "sessions";

export class Sessions extends Base {
  
  async getSessionById(id: number): Promise<Session> {
    const session = await this.request<Session>(`/${resourceName}/${id}`);
    return session;
  }

  async createSession(newSession: NewSession): Promise<Session> {
    const session = await this.request<Session>(`/${resourceName}`, {
      method: "POST",
      body: JSON.stringify(newSession),
    });
    return session;
  }
}