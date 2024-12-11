import nodemailer from 'nodemailer'
import config from '../config.js';

let transporter;
try {
  transporter = nodemailer.createTransport(config.mail);
  await transporter.verify()
  console.log("SMTP connected");
} catch (e) {
  console.error("email smtp error ", e);
}

export default transporter