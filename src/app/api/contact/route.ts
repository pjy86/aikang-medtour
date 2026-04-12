import {NextResponse} from 'next/server';
import postgres from 'postgres';

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