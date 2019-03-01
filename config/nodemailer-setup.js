const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_MAIL,
    pass: process.env.GMAIL_PASS
  }
});

function sendSignupMail(userDoc) {
  transport.sendMail({
    from: "TimeFor <timefor@example.com>",
    to: ` ${userDoc.fullName} <${userDoc.email}>`,
    subject: "Thank you for ...",
    text: `Welcome, ${
      userDoc.firstName
    }! Thank you for joining the TimeFor family.`,
    html: `
      <h1 style="color:orange;">Welcome, ${userDoc.fullName}!</h1>
      <p style="font-style: italic;">Thank you for joining the TimeFor family</p>
      `
  });
}

function sendPasswordEmail() {
  return transport.sendMail({
    from: "TimeFor <timefor@example.com>",
    to: ` ${userDoc.fullName} <${userDoc.email}>`,
    subject: "Don't forget your password",
    text: "Don't forget your password",
    html: `
      <h1 style="color: orange;">Don't forget your password!</h1>`
  });
}

module.exports = { sendSignupMail, sendPasswordEmail };
