import { createConnection, Connection } from 'mysql2/promise';

const databaseConfig = {
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
};

const databaseName = 'your_database';

export async function checkDatabaseExistence() {
  try {
    const connection: Connection = await createConnection(databaseConfig);

    const [rows] = await connection.execute('SHOW DATABASES LIKE ?', [databaseName]);

    await connection.end();

    if (Array.isArray(rows)) {
      return rows.length > 0;
    } else {
      console.error('Unexpected response format from the database');
      return false;
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Error checking database existence:', error.message);
    } else {
      console.error('Unknown error occurred while checking database existence');
    }
    return false;
  }
}

// Usage: Call the function to check if the database exists
(async () => {
  const exists = await checkDatabaseExistence();
  console.log(`Database exists: ${exists}`);
})();
