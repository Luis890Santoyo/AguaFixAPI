import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.mailHost,
      port: envs.mailPort,
      secure: envs.mailSecure,
      auth: envs.mailUser
        ? {
            user: envs.mailUser,
            pass: envs.mailPassword,
          }
        : undefined,
    });
  }

  async sendEmail(to: string, subject: string, template: string): Promise<void> {
    await this.transporter.sendMail({
      from: envs.mailFrom,
      to,
      subject,
      html: template,
    });
  }
}
