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

export async function PUT(request: Request) {
  try {
    const sql = getSql();
    const body = await request.json();
    const {key, value} = body;

    if (!key || value === undefined) {
      return NextResponse.json({error: 'Missing key or value'}, {status: 400});
    }

    await sql`
      INSERT INTO cms_content (key, value)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb)
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}::jsonb
    `;

    await sql.end();
    return NextResponse.json({success: true}, {status: 200});
  } catch (error) {
    console.error('Error updating CMS content:', error);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
