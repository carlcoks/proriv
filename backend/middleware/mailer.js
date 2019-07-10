const nodemailer = require("nodemailer");
const config = require('../config');

const mailer = {
  sendMail: async (title, text, toMail) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      }
    });

    let info = await transporter.sendMail({
      from: 'ittruemrdro4@yandex.ru',
      to: toMail,
      subject: title,
      text: text,
    });
  },
}

module.exports = mailer;
