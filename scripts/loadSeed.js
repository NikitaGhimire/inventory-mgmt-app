const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

(async () => {
  try {
    const seedSQL = fs.readFileSync(path.join(__dirname, 'scripts/seed.sql'), 'utf-8');
    await pool.query(seedSQL);
    console.log('Seed data loaded successfully');
  } catch (err) {
    console.error('Error loading seed data:', err.message);
  } finally {
    pool.end();
  }
})();