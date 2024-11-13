import { SignupDTO, LoginDTO } from "./../application/useCases/dtos/authDtos";

export class Validator {
  // Method to validate and sanitize Signup data
  static validateSignup(data: Partial<SignupDTO>): { isValid: boolean; errors: string[]; sanitizedData?: SignupDTO } {
    const errors: string[] = [];

    // Validate fields
    if (!data.email || typeof data.email !== "string" || !Validator.isEmailValid(data.email)) {
      errors.push("Invalid email");
    }

    if (!data.password || typeof data.password !== "string" || data.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
      errors.push("Name is required");
    }

    // If validation fails, return errors
    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Sanitize data
    const sanitizedData: SignupDTO = {
      email: data?.email?.trim().toLowerCase() ?? "",
      password: data?.password?.trim() ?? "",
      name: data?.name?.trim() ?? ""
    };

    return { isValid: true, errors, sanitizedData };
  }

  // Method to validate and sanitize Login data
  static validateLogin(data: Partial<LoginDTO>): { isValid: boolean; errors: string[]; sanitizedData?: LoginDTO } {
    const errors: string[] = [];

    // Validate fields
    if (!data.email || typeof data.email !== "string" || !Validator.isEmailValid(data.email)) {
      errors.push("Invalid email");
    }

    if (!data.password || typeof data.password !== "string") {
      errors.push("Password is required");
    }

    // If validation fails, return errors
    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    // Sanitize data
    const sanitizedData: LoginDTO = {
      email: data?.email?.trim().toLowerCase() ?? "",
      password: data?.password?.trim() ?? ""
    };

    return { isValid: true, errors, sanitizedData };
  }

  // Utility method to validate email format
  private static isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
