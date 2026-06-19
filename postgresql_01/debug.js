import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Found' : '❌ Missing');
console.log('URL value:', process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL);

// Test 1: Simple connection test
try {
    const result = await sql`SELECT current_database(), current_user, version()`;
    console.log('\n✅ Connection SUCCESS!');
    console.log('Database:', result[0].current_database);
    console.log('User:', result[0].current_user);
} catch (err) {
    console.log('\n❌ Connection FAILED:', err.message);
}

// Test 2: Check if cars table exists
try {
    const tables = await sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
    `;
    console.log('\n📋 Tables in public schema:', tables.length === 0 ? 'NONE' : tables.map(t => t.table_name).join(', '));
} catch (err) {
    console.log('\n❌ Failed to list tables:', err.message);
}
