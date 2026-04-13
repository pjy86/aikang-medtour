import {NextResponse} from 'next/server';
import postgres from 'postgres';
import nodemailer from 'nodemailer';

function getSql() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('No database URL found');
  }
  
  return postgres(connectionString, {
    ssl: 'require',
    connect_timeout: 10,
  });
}

async function sendNotificationEmail(data: {
  name: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
    <h2>New Inquiry from AiKang Medical Tour Website</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px; font-weight: bold;">Name</td>
        <td style="padding: 8px;">${data.name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px; font-weight: bold;">Email</td>
        <td style="padding: 8px;"><a href="mailto:${data.email}">${data.email}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px; font-weight: bold;">Phone</td>
        <td style="padding: 8px;">${data.phone || 'N/A'}</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px; font-weight: bold;">Country</td>
        <td style="padding: 8px;">${data.country || 'N/A'}</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px; font-weight: bold;">Service Interest</td>
        <td style="padding: 8px;">${data.service || 'N/A'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Message</td>
        <td style="padding: 8px;">${data.message.replace(/\n/g, '<br>')}</td>
      </tr>
    </table>
    <p style="margin-top: 20px; color: #666; font-size: 12px;">
      Submitted at: ${new Date().toISOString()}
    </p>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.NOTIFICATION_EMAIL || 'info@aikangmedtour.com',
    subject: `New Inquiry from ${data.name} - AiKang Medical Tour`,
    html: htmlContent,
  });
}

export async function POST(request: Request) {
  try {
    const sql = getSql();
    const body = await request.json();
    const {name, email, phone, country, service, message} = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400}
      );
    }

    await sql`
      INSERT INTO inquiries (name, email, phone, country, service, message)
      VALUES (${name}, ${email}, ${phone || ''}, ${country || ''}, ${service || ''}, ${message})
    `;

    await sql.end();

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendNotificationEmail({name, email, phone, country, service, message});
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
      }
    }

    return NextResponse.json(
      {success: true, message: 'Form submitted successfully'},
      {status: 200}
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    const err = error as Error;
    return NextResponse.json(
      {error: 'Internal server error', details: String(error), name: err?.name, message: err?.message},
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT * FROM inquiries ORDER BY created_at DESC
    `;
    await sql.end();
    return NextResponse.json(rows, {status: 200});
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    const err = error as Error;
    return NextResponse.json(
      {error: 'Internal server error', details: String(error), name: err?.name, message: err?.message},
      {status: 500}
    );
  }
}
