import { Request, Response } from "express";
import { AuthUseCases } from "../../application/useCases/auth";
import { UserRepository } from "../repositories/UserRepository";
import { CustomError } from "../../utils/CustomError";
import { logger } from "../../utils/Logger";
import { Validator } from "../../utils/Validator";

class AuthController {
  private userRepository: UserRepository;
  private authUseCases: AuthUseCases;

  constructor() {
    this.userRepository = new UserRepository();
    this.authUseCases = new AuthUseCases(this.userRepository);
  }

  // Remove the static keyword so the method can use instance properties
  async registerUser(req: Request, res: Response) {
    try {
      const { isValid, errors, sanitizedData } = Validator.validateSignup(req.body);

      if (!isValid || !sanitizedData) {
        return res.status(400).json({ code: "VALIDATION_ERROR", errors });
      }

      const registerResponse = await this.authUseCases.Register(sanitizedData);
      if(registerResponse.Status){
        res.status(201).json(registerResponse);
      }else{
        logger.error("Error during user registration");
        res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" });
      }
    } catch (error) {
      logger.error("Error during user registration:", error);
      if (error instanceof CustomError) {
        res.status(400).json({ code: error.code, message: error.message });
      } else{
        logger.error("Error during user login");
        res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" });
      }
    }
  }
  async loginUser(req: Request, res: Response) {
    try {
      const { isValid, errors, sanitizedData } = Validator.validateLogin(req.body);
      
      if (!isValid || !sanitizedData) {
        return res.status(400).json({ code: "VALIDATION_ERROR", errors });
      }
      const { email, password } = sanitizedData;
      const loginRespose = await this.authUseCases.Login({ email, password });
      if(loginRespose.Status){
        res.status(200).json(loginRespose);
      }else{
        res.status(401).json({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }
    } catch (error) {
      logger.error("Error during user login:", error);
      if (error instanceof CustomError) {
        res.status(400).json({ code: error.code, message: error.message });
      } else {
        res.status(500).json({ code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" });
      }
    }
  }
}
const authController=new AuthController();

export default {
  registerUser: authController.registerUser.bind(authController),
  loginUser: authController.loginUser.bind(authController)
}