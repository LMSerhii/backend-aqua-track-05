import nodemailer from "nodemailer";
import { BASE_URL, MAIL_NAME, MAIL_PSW, PORT } from "../index.js";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: MAIL_NAME,
    pass: MAIL_PSW,
  },
});

export const sendEmail = async (email, verificationToken) => {
  await transporter.sendMail({
    from: MAIL_NAME,
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/api/v1/users/verify/${verificationToken}">Click verify email</a>`,
  });

  console.log("email sent");
};

export const sendForgotTokenByEmail = async (email, verificationToken) => {
  await transporter.sendMail({
    from: MAIL_NAME,
    to: email,
    subject: "Reset password link",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/api/v1/users/reset-password/${verificationToken}">Click verify email</a>`,
  });

  console.log("Reset password link sent");
};
