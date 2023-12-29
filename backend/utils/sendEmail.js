import nodemailer from "nodemailer";

const sendEmail = async(options) =>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD
    }
  });

  const message = {
    from: `${process.env.SENDER} <${process.env.SENDER_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  }
  await transporter.sendMail(message);
};

export default sendEmail;