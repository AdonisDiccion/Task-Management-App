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
        html: `<h1>Verify your email</h1>
        <p>Click</p> <a href>'<a href="${verificationLink}" style="display: inline-block; background-color: #277DA1; color: #fff; text-decoration: none; padding: 16px 24px; font-size: 24px; font-family: sans-serif; border-radius: 4px; width: 80%">Click to Verify</a>`
    };

    transporter.sendMail(mailOptions , (err, info)=> {
        if(err) {
            console.error(err);
        } else {
            console.log(`Email sent ${info.response}`);
        }
    });
};