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

export const sendEmail = async (name, email, verificationToken) => {
  await transporter.sendMail({
    from: MAIL_NAME,
    to: email,
    subject: "Verify email",
    html: `<p>Hi ${name},</p>
    <p>Thanks for getting started with our <b>Aqua Track!</b></p>
    <p>
      We need a little more information to complete your registration, including a
      confirmation of your email address.
    </p>
    <p>Click below to confirm your email address:</p>
    <p><a
      target="_blank"
      href="${BASE_URL}:${PORT}/api/v1/users/verify/${verificationToken}"
      >Click verify email</a
    > 
    </p>
    <p>${BASE_URL}:${PORT}/api/v1/users/verify/${verificationToken}</p>
    <p>If you have problems, please paste the above URL into your web browser.</p>`,
  });

  console.log("email sent");
};

export const sendForgotTokenByEmail = async (email, verificationToken) => {
  await transporter.sendMail({
    from: MAIL_NAME,
    to: email,
    subject: "Reset password link",
    html: `<table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <tr>
      <td>
        <h2 style="text-align: center;">AquaTrack - Password Reset</h2>
        <p style="text-align: center;">Dear User,</p>
        <p style="text-align: center;">
        You have requested to reset your password on AquaTrack. To proceed with the password reset, please click the link below:</p>
        <p style="text-align: center;">
        <a href="${BASE_URL}:8000/reset-password-form/${verificationToken}" 
        style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">
      Reset Password</a></p>
        <p style="text-align: center;">If you did not request this password reset, you can safely ignore this email.</p>
        <p style="text-align: center;">Best Regards,<br>AquaTrack Team</p>
      </td>
    </tr>
  </table>`,
  });

  console.log("Reset password link sent");
};
