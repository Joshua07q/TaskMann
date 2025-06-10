const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use Mailgun, SendGrid
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReminderEmail(to, taskTitle, remindAt) {
  await transporter.sendMail({
    from: `"Task Reminder" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Reminder: ${taskTitle}`,
    html: `<p>Your task <strong>${taskTitle}</strong> is due at ${new Date(remindAt).toLocaleString()}.</p>`,
  });
}

module.exports = sendReminderEmail; 
// This function checks the .env file for email credentials to send reminder emails.