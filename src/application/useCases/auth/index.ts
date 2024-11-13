import config from "../../../config";
import { ErrorCodes } from "../../../constants/errorCodes";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { generateToken, validatePassword } from "../../../utils/AuthUtils";
import { CustomError } from "../../../utils/CustomError";
import { LoginDTO, SignupDTO } from "../dtos/authDtos";

export type SignupResponse = {
  Status: boolean;
  user?: Partial<User>;
};
export type LoginResponse = {
  Status: boolean;
  user?: Partial<User>;
  token?: string;
};
export class AuthUseCases {
  constructor(private userRepository: UserRepository) {}
  async Register(user: SignupDTO): Promise<SignupResponse> {
    const signupResponse: SignupResponse = { Status: false };
    const userEmailExists = await this.userRepository.find(null, user.email);
    if (userEmailExists) throw new CustomError(ErrorCodes.EMAIL_ALREADY_EXISTS, "Email already exists");
    const newUser = await this.userRepository.create(user);
    if (newUser) {
      signupResponse.Status = true;
      signupResponse.user = newUser;
    }
    return signupResponse;
  }

  async Login(user: LoginDTO): Promise<LoginResponse> {
    const loginResponse: LoginResponse = { Status: false };
    const userDetails = await this.userRepository.find(null, user.email);
    const isValidPassword = userDetails?.password ? validatePassword(user.password, userDetails.password) : false;
    if (!userDetails || !isValidPassword) throw new CustomError(ErrorCodes.INVALID_CREDENTIALS, "Invalid credentials");
    userDetails.password = "";
    const token = generateToken(JSON.stringify(userDetails),config.JWT_SECRET, null);
    if (token) {
      loginResponse.Status = true;
      loginResponse.token = token;
      loginResponse.user = userDetails;
    } else {
      throw new CustomError(ErrorCodes.INVALID_CREDENTIALS, "Invalid credentials");
    }
    return loginResponse;
  }
}
