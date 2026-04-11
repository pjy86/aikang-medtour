import {NextResponse} from 'next/server';
import {neon} from '@neondatabase/serverless';

function getSql() {
  const connectionString = process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error('POSTGRES_URL environment variable is not set');
  }
  return neon(connectionString);
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

    return NextResponse.json(
      {success: true, message: 'Form submitted successfully'},
      {status: 200}
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      {error: 'Internal server error', details: String(error), name: error?.name, message: error?.message},
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
    return NextResponse.json(rows, {status: 200});
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      {error: 'Internal server error', details: String(error), name: error?.name, message: error?.message},
      {status: 500}
    );
  }
}