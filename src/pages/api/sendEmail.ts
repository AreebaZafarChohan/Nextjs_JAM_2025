import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  to: string;
  subject: string;
  text: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Only handle POST requests
  if (req.method === 'POST') {
    const { to, subject, text }: EmailRequestBody = req.body;

    // Set up the transporter using your email service (Gmail in this case)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'areebazafar715@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password (use environment variables ideally)
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'areebazafar715@gmail.com', // Replace with your email
      to,
      subject,
      text,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Error sending email.' });
    }
  } else {
    // If the method is not POST, return a 405 error
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};
