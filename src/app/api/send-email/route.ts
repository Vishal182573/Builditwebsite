// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { type, name, email, phone, area, location, budget, interiorTypes } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  
  console.log(process.env.GMAIL_USER);
  console.log(process.env.GMAIL_PASSWORD);
  const mailOptions = {
    from: email,
    to: 'sharmavs9205@gmail.com', // Replace with the admin's email
    subject: `Contact Form Submission from ${name}`,
    text: `Type: ${type}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nArea: ${area}\nLocation: ${location}\nBudget: ${budget}\nInterior Types: ${interiorTypes}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
