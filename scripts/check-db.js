const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_v68ZMCGAlSdO@ep-floral-silence-an1xzafs-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to Neon database!');

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('inquiries', 'cms_content')
    `);
    
    console.log('Existing tables:', res.rows.map(r => r.table_name));

    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        country VARCHAR(100),
        service VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table inquiries: OK');

    await client.query(`
      CREATE TABLE IF NOT EXISTS cms_content (
        key VARCHAR(100) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table cms_content: OK');

    const cmsData = await client.query('SELECT key, value FROM cms_content');
    console.log('CMS data count:', cmsData.rows.length);
    if (cmsData.rows.length > 0) {
      cmsData.rows.forEach(row => {
        console.log(`  - ${row.key}`);
      });
    } else {
      console.log('  No CMS data yet');
    }

    await client.end();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
