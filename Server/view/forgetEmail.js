const forgetPasswordTemplate = (token) => {
    return template = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Forget Password</title>
                        </head>
                        <body>
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7f5; padding:30px 0;">
                                <tr>
                                    <td align="center">
                                        <table width="600" cellpadding="0" cellspacing="0" border="0"
                                            style="max-width:600px; width:100%; background:#ffffff;">

                                            <!-- Header -->
                                            <tr>
                                                <td style="background:#198754; padding:25px; text-align:center;">
                                                    <h1 style="margin:0; color:#ffffff; font-size:28px;">
                                                        Expense Tracker - Forget Password
                                                    </h1>
                                                </td>
                                            </tr>

                                            <!-- Content -->
                                            <tr>
                                                <td style="padding:40px 35px; color:#333333;">
                                                    <h2 style="margin-top:0; color:#198754;">
                                                        Welcome!
                                                    </h2>
                                                    <p style="font-size:16px; line-height:1.6; margin-bottom:20px;">
                                                        Hello there,
                                                    </p>
                                                    <p style="font-size:16px; line-height:1.6;">
                                                        Please find the link below to reset your password. Click the button to proceed.
                                                    </p>
                                                    <!-- Button -->
                                                    <table cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
                                                        <tr>
                                                            <td style="background:#198754; border-radius:5px;">
                                                                <a href="http://localhost:3000/api/password/resetpassword/${token}" style="display:inline-block; padding:14px 28px;
                                                                        color:#ffffff; text-decoration:none;
                                                                        font-size:16px; font-weight:bold;">
                                                                    Reset Password
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <!-- Footer -->
                                            <tr>
                                                <td style="background:#f8f9fa; padding:20px; text-align:center;">
                                                    <p style="margin:0; color:#777777; font-size:13px;">
                                                        Expense Tracker. All rights reserved.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>
                    `
}

module.exports = forgetPasswordTemplate;