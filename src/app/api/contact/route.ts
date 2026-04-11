import {NextResponse} from 'next/server';
import postgres from 'postgres';

function getSql() {
  const host = process.env.PGHOST || process.env.POSTGRES_HOST;
  const user = process.env.PGUSER || process.env.POSTGRES_USER;
  const password = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
  const database = process.env.PGDATABASE || process.env.POSTGRES_DATABASE || 'neondb';
  
  console.log('DB Config:', { host, user, hasPassword: !!password, database });
  
  if (!host || !user || !password) {
    throw new Error(`Missing database config: host=${!!host}, user=${!!user}, password=${!!password}`);
  }
  
  return postgres({
    host,
    user,
    password,
    database,
    ssl: 'require',
    timeout: 10,
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