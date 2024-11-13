import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { hashPassword } from "../../utils/AuthUtils";
import UserModel from "../mongoose/models/UserModel";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    user={...user,password:hashPassword(user.password)}
    const newUser = new UserModel(user);
    await newUser.save();
    newUser.password=""
    return newUser;
  }
  async update(user: User, id: string|null, email: string|null): Promise<User | null> {
    if (id) return await UserModel.findByIdAndUpdate(id, user).select("password -1");
    if (email) return await UserModel.findOneAndUpdate({ email }, user).select("password -1");
    return null;
  }
  async find(id: string|null, email: string|null): Promise<User | null> {
    if (id) return await UserModel.findById(id).lean();
    if (email) return await UserModel.findOne({ email }).lean();
    return null;
  }
  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
