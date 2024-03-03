import Forgot from "../../models/Forgot";
import User from "../../models/User";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = `nwejb34njbhjbb23h424b5v52b4f`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });

    // Email sending logic
    let transporter = nodemailer.createTransport({
      service: "gmail", // Replace if you're using a different provider
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: req.body.email,
      subject: "Password Reset",
      html: `
        We have sent you this email in response to your request to reset your password on manyavar.
        <br/><br/>
        To reset your password, please follow the link below:
        <a href="http://localhost:3000/forgot?token=${token}"> Click here to reset your password </a>
        <br/><br/>
        We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send({ success: false });
      } else {
        console.log("Email sent: " + info.response);
        res.send({ success: true });
      }
    });
  } else {
    // reset user password (code missing from your snippets)
  }
  res.send({ sucess: true }); // Default
}
