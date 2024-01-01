import { createConnection, Connection } from 'mysql2/promise';
import { checkDatabaseExistence } from './databaseCheck';
import { RowDataPacket } from 'mysql2/promise';


const databaseConfig = {
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
};


export interface ProductRow extends RowDataPacket {
    url: string;
    currency: string;
    image: string;
    title: string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: Array<{ price: number; date: Date }>;
    lowestPrice?: number;
    highestPrice?: number;
    averagePrice?: number;
    discountRate: number;
    description?: string;
    category?: string;
    reviewsCount?: number;
    isOutOfStock: boolean;
    users?: Array<{ email: string }>;
  }
  

export async function connectToDatabase() {
  try {

    const databaseExists = await checkDatabaseExistence();
    if (!databaseExists) {
      throw new Error('Database does not exist or connection issue');
    }
    

    
    const connection: Connection = await createConnection(databaseConfig);
    return connection;
  } catch (error:any) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

export async function insertProduct(connection: Connection, productData: any) {
    try {
      const {
        url,
        currency,
        image,
        title,
        currentPrice,
        originalPrice,
        priceHistory,
        lowestPrice,
        highestPrice,
        averagePrice,
        discountRate,
        category,
        reviewsCount,
        isOutOfStock,
        users,
      } = productData;
  
      // Then use these variables in the execute function
      await connection.execute(
        'INSERT INTO products (url, currency, image, title, currentPrice, originalPrice, priceHistory, lowestPrice, highestPrice, averagePrice, discountRate, category, reviewsCount, isOutOfStock, users) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          url,
          currency,
          image,
          title,
          currentPrice,
          originalPrice,
          JSON.stringify(priceHistory),
          lowestPrice,
          highestPrice,
          averagePrice,
          discountRate,
          category,
          reviewsCount,
          isOutOfStock ? 1 : 0,
          JSON.stringify(users),
        ]
      );
    } catch (error:any) {
      console.error('Error inserting product:', error.message);
      throw error;
    }
  }
  