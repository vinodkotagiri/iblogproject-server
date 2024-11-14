import { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { ErrorCodes } from "../../../constants/errorCodes";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import EmailService from "../../../infrastructure/services/EmailService";
import { generateToken, validatePassword, validateToken } from "../../../utils/AuthUtils";
import { CustomError } from "../../../utils/CustomError";
import { LoginDTO, SignupDTO } from "../dtos/authDtos";
import { logger } from "../../../utils/Logger";

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
      // Create a verification token for the newly created user
      const verificationToken = generateToken(JSON.stringify({ userId: newUser.id }),config.JWT_SECRET,"1h");
      await new EmailService().sendVerificationEmail(user.email, verificationToken);
    }
    return signupResponse;
  }

  async Login(user: LoginDTO): Promise<LoginResponse> { 
    const loginResponse: LoginResponse = { Status: false };
    const userDetails = await this.userRepository.find(null, user.email);
    const isValidPassword = userDetails?.password ? validatePassword(user.password, userDetails.password) : false;
    if (!userDetails || !isValidPassword) throw new CustomError(ErrorCodes.INVALID_CREDENTIALS, "Invalid credentials");
    userDetails.password = "";
    const token = generateToken(JSON.stringify(userDetails), config.JWT_SECRET, null);
    if (token) {
      loginResponse.Status = true;
      loginResponse.token = token;
      loginResponse.user = userDetails;
    } else {
      throw new CustomError(ErrorCodes.INVALID_CREDENTIALS, "Invalid credentials");
    }
    return loginResponse;
  }

  async VerifyEmail(token: string): Promise<boolean> {
    try {
      // Verify and decode the token
      const decoded = validateToken(token, config.JWT_SECRET);
      const userId = decoded.userId;

      // Find the user by ID
      const user = await this.userRepository.find(userId,null);
      if (!user) throw new CustomError(ErrorCodes.USER_NOT_FOUND, "User not found");

      // Update user’s email verification status
      user.isVerified = true;
      await this.userRepository.update(user, userId, null);

      return true; // Email successfully verified
    } catch (error) {
      logger.error("Error verifying email:", error);
      throw new CustomError(ErrorCodes.INVALID_TOKEN, "Invalid or expired token");
    }
  }

}
