import nodemailer from "nodemailer";
import config from "../../config";
import { logger } from "../../utils/Logger";

interface EmailServiceOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

class EmailService {
  private transporter;

  constructor() {
    // Create a transporter object using SMTP transport
    this.transporter = nodemailer.createTransport({
      service: config.MAIL.SERVICE,
      auth: {
        user: config.MAIL.ID,
        pass: config.MAIL.PWD
      }
    });
  }

  // Method to send an email
  async sendMail(options: EmailServiceOptions) {
    try {
      const info = await this.transporter.sendMail({
        from: config.MAIL.ID, // Sender address
        to: options.to, // Recipient address
        subject: options.subject, // Subject line
        text: options.text, // Plain text body
        html: options.html // HTML body
      });

      logger.info("Message sent: %s", info.messageId);
      return info;
    } catch (error) {
      logger.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }

  // Send verification email method
  async sendVerificationEmail(to: string, verificationToken: string) {
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

    const htmlContent = `
      <h2>Welcome! Please verify your email address</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;

    const textContent = `Please verify your email by clicking on the following link: ${verificationLink}`;

    const options = {
      to,
      subject: "Email Verification",
      text: textContent,
      html: htmlContent
    };

    return this.sendMail(options);
  }
}

export default EmailService;
