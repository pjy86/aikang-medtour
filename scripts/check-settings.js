process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_v68ZMCGAlSdO@ep-floral-silence-an1xzafs-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require',
  });
  
  await client.connect();
  
  const res = await client.query('SELECT key, value FROM cms_content WHERE key = $1', ['settings']);
  if (res.rows.length > 0) {
    console.log('Settings value:', JSON.stringify(res.rows[0].value, null, 2));
  } else {
    console.log('No settings found');
  }
  
  await client.end();
  process.exit(0);
}

main().catch(e => { console.error(e.message); process.exit(1); });
