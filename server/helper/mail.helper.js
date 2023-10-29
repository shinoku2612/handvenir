const nodemailer = require("nodemailer");

class HMail {
    static async send(receiver, subject, template, link) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_AUTH_MAIL,
                pass: process.env.NODE_AUTH_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${process.env.NODE_APP_NAME}" <${process.env.NODE_AUTH_MAIL}>`,
            replyTo: "noreply.account.handvenir@gmail.com",
            to: receiver,
            subject,
            html: template(link),
        });
    }

    static template = {
        register: (link) => {
            return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            font-size: 16px;
                        }
                        *::before,
                        *::after {
                            box-sizing: border-box;
                        }
                        #mail__container {
                        }
                        .header {
                            padding: 10px;
                            border-bottom: 1px solid #eeeeee;
                        }
                        .greeting {
                            text-align: center;
                            font-weight: 600;
                            font-size: 32px;
                        }
                        .header__logo {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .header__logo img {
                            width: 80px;
                            margin: auto;
                        }
                        .letter {
                            padding: 10px;
                        }
                        .letter__opening,
                        .letter__body,
                        .letter__closing {
                            padding: 8px 0;
                        }
                        .thanks,
                        .remind,
                        .regards {
                            padding: 4px 0;
                        }
                        .link__container {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    </style>
                </head>
                <body>
                    <div id="mail__container">
                        <div class="header">
                            <h3 class="greeting">Welcome to our platform</h3>
                            <div class="header__logo">
                                <img src="https://handvenir.vercel.app/logo.png" alt="${process.env.NODE_APP_NAME}" />
                            </div>
                        </div>
                        <div class="letter">
                            <div class="letter__opening">
                                <p>Hello,</p>
                            </div>
                            <div class="letter__body">
                                <p class="thanks">
                                    Thank you for choosing <strong>${process.env.NODE_APP_NAME}</strong>. Use
                                    this <a href="${link}" target="#">link</a> to complete your register progress and verify your
                                    account on our platform.
                                </p>
                                <p class="remind">
                                    Remember, never share this link with anyone, not even if
                                    <strong>${process.env.NODE_APP_NAME}</strong> ask to you.
                                </p>
                            </div>
                            <div class="letter__closing">
                                <p class="regards">Regards,</p>
                                <p>Team <strong>${process.env.NODE_APP_NAME}</strong></p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>    
            `;
        },
        login: (link) => {
            return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            font-size: 16px;
                        }
                        *::before,
                        *::after {
                            box-sizing: border-box;
                        }
                        #mail__container {
                        }
                        .header {
                            padding: 10px;
                            border-bottom: 1px solid #eeeeee;
                        }
                        .greeting {
                            text-align: center;
                            font-weight: 600;
                            font-size: 32px;
                        }
                        .header__logo {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .header__logo img {
                            width: 80px;
                            margin: auto;
                        }
                        .letter {
                            padding: 10px;
                        }
                        .letter__opening,
                        .letter__body,
                        .letter__closing {
                            padding: 8px 0;
                        }
                        .thanks,
                        .remind,
                        .regards {
                            padding: 4px 0;
                        }
                        .link__container {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    </style>
                </head>
                <body>
                    <div id="mail__container">
                        <div class="header">
                            <h3 class="greeting">Welcome back</h3>
                            <div class="header__logo">
                                <img src="https://handvenir.vercel.app/logo.png" alt="${process.env.NODE_APP_NAME}" />
                            </div>
                        </div>
                        <div class="letter">
                            <div class="letter__opening">
                                <p>Hello,</p>
                            </div>
                            <div class="letter__body">
                                <p class="thanks">
                                    Welcome back, use
                                    this <a href="${link}" target="#">link</a> to complete your login.
                                </p>
                                <p class="remind">
                                    Remember, never share this link with anyone, not even if
                                    <strong>${process.env.NODE_APP_NAME}</strong> ask to you.
                                </p>
                            </div>
                            <div class="letter__closing">
                                <p class="regards">Regards,</p>
                                <p>Team <strong>${process.env.NODE_APP_NAME}</strong></p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>    
            `;
        },
    };
}

module.exports = HMail;
