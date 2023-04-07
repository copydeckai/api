import nodemailer from 'nodemailer';
import handlebar from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const sendEmail = async (
  email: string,
  subject: string,
  contentLink: string,
  name: string,
  template: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.MAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.LOGIN,
      },
    });
    // verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Server is ready to take messages: ${success}`);
      }
    });

    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve(__dirname, 'emails'),
        defaultLayout: template,
      },
      viewPath: path.resolve(__dirname, 'emails'),
      extName: '.hbs',
    };

    transporter.use('compile', handlebar(handlebarOptions));

    const mailOptions = {
      from: `Copydeck Inc. <${process.env.EMAIL}>`,
      to: email,
      subject,
      template,
      context: {
        email,
        name,
        link: contentLink,
      },
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Unable to send email: ${error}`);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
