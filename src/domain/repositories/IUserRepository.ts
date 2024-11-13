import { User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User|null>;
  find(id?: string|null,email?: string|null): Promise<User|null>;
  update(user:Partial<User>,id?: string|null,email?:string|null): Promise<User|null>;
  delete(id: string): Promise<void>;
}
