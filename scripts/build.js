const { execSync } = require('child_process');
const path = require('path');

try {
  // Run database migrations
  const schemaPath = path.join(__dirname, 'schema.sql');
  execSync(`psql ${process.env.DATABASE_URL} -f ${schemaPath}`);
  console.log('Database schema applied successfully');
} catch (error) {
  console.error('Error applying database schema:', error);
  process.exit(1);
}