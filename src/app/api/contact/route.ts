import {NextResponse} from 'next/server';
import {sql} from '@vercel/postgres';

export async function POST(request: Request) {
  try {
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

    return NextResponse.json(
      {success: true, message: 'Form submitted successfully'},
      {status: 200}
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {error: 'Internal server error'},
      {status: 500}
    );
  }
}

export async function GET() {
  try {
    const {rows} = await sql`
      SELECT * FROM inquiries ORDER BY created_at DESC
    `;
    return NextResponse.json(rows, {status: 200});
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      {error: 'Internal server error'},
      {status: 500}
    );
  }
}