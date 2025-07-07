import nodemailer from 'nodemailer';
import mustache from 'mustache';
import fs from 'fs/promises';
import path from 'path';

async function compileTemplate(templateName: string, data: any) {
  const filePath = path.join(process.cwd(), 'emails', 'templates', `${templateName}.mustache`);
  const templateContent = await fs.readFile(filePath, 'utf8');
  return mustache.render(templateContent, data);
}

export async function sendEmail({
  to,
  subject,
  template,
  data,
}: {
  to: string;
  subject: string;
  template: string;
  data: any;
}) {
  const html = await compileTemplate(template, data);

  const transporter = nodemailer.createTransport({
    host: 'techproinnovationsltd.com',
    port: 465, // Use 587 if SSL is not enabled
    secure: true, // true for port 465, false for port 587
    auth: {
      user: 'hr@techproinnovationsltd.com',
      pass: process.env.EMAIL_PASSWORD, // Set this in your .env
    },
  });

  const mailOptions = {
    from: '"Talent Pro Africa" <hr@techproinnovationsltd.com>',
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email sent!', info.messageId);
}
