const nodemailer = require('nodemailer');

async function sendMail(receiver, subject, mailTemplate) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODE_AUTH_MAIL,
            pass: process.env.NODE_AUTH_PASS,
        },
    });

    await transporter.sendMail({
        from: `"ShinPay" <${process.env.NODE_AUTH_MAIL}>`,
        replyTo: 'noreply.account.shinpay@gmail.com',
        to: receiver,
        subject,
        html: 'Hello',
    });
}
module.exports = sendMail;
