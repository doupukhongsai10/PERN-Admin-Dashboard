import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');

const sql = neon(process.env.DATABASE_URL);

const migrationSQL = readFileSync(
  join(__dirname, 'drizzle', '0000_naive_alex_wilder.sql'),
  'utf8'
);

console.log('Running migration...');
console.log(migrationSQL);

await sql.query(migrationSQL);

console.log('✅ Migration complete! "cars" table created in Neon.tech.');
