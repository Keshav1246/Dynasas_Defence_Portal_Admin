const nodemailer = require('nodemailer');
const logger = require('../config/logger');

let testAccount = null;

const createTransporter = async () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    logger.warn('SMTP credentials missing. Generating an Ethereal test account...');
    if (!testAccount) {
      testAccount = await nodemailer.createTestAccount();
    }
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

let transporterInstance = null;

const getTransporter = async () => {
  if (!transporterInstance) {
    transporterInstance = await createTransporter();
  }
  return transporterInstance;
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Dynasoft Admin" <noreply@dynasoft.com>',
      to,
      subject,
      html,
    });
    
    logger.info(`Email sent: ${info.messageId}`);
    
    // Log the Ethereal URL if using Ethereal
    if (testAccount) {
      logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    
    return info;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw new Error('Could not send email');
  }
};

module.exports = {
  sendEmail,
};
