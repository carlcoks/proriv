const nodemailer = require("nodemailer");
const config = require('../config');

const mailer = {
  sendMail: async (title, text, toMail, type) => {
    try {
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
      let data = {
        from: config.emailUser,
        to: toMail,
        subject: title,
      }

      if (type == 'html')
        data.html = text;
      else
        data.text = text;

      let info = await transporter.sendMail(data);
    } catch(e) {
      console.log(e);
      return e;
    }
  },
}

module.exports = mailer;
