import nodemailer from 'nodemailer';
import { serverUrl, emailUser, emailPass } from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

export function sendVerificationEmail ( email, token ) {
    const verificationLink = `${serverUrl}/verify-email?token=${token}`;


    const mailOptions = {
        from: 'adonisdiccion2408@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: `
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
                <h1 style="margin: 0; color: #277DA1;">Verify your email</h1>
            </div>
            <div style="text-align: center; padding: 20px 0;">
                <p style="font-size: 18px; color: #333;">Click the button below to verify your email:</p>
                <a href="${verificationLink}" style="display: inline-block; background-color: #277DA1; color: #fff; text-decoration: none; padding: 16px 24px; font-size: 20px; font-family: sans-serif; border-radius: 4px; margin-top: 20px;">Click to Verify</a>
            </div>
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ddd; color: #777; font-size: 14px;">
                <p>If you did not create an account, no further action is required.</p>
            </div>
        </div>
    `
    };

    transporter.sendMail(mailOptions , (err, info)=> {
        if(err) {
            console.error(err);
        } else {
            console.log(`Email sent ${info.response}`);
        }
    });
};