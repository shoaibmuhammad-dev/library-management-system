// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, html) => {
//   await transporter.sendMail({
//     from: `"Your App"`,
//     to,
//     subject,
//     html,
//   });
// };

// module.exports = sendEmail;
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  const { data, error } = await resend.emails.send({
    from: "Library Management System <no-reply@mail.shoaibmuhammad.dev>",
    to: [to],
    subject,
    html,
  });

  if (error) {
    console.error("Resend email error:", error);
    throw new Error("Failed to send email");
  }

  return data;
};

module.exports = sendEmail;
