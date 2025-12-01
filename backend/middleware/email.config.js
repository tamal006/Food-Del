import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "tamalkumarkhan006@gmail.com",
    pass: "jjvs qocx ceun hykj",
  },
});
const sendMailer = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <tamalkumarkhan006@gmail.com>',
      to: "khantamal99@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?", // plain‑text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
sendMailer();
