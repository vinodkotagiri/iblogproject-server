export type Role = "user" | "admin";
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  isVerified?: boolean;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
