import { scrapeAmazonProduct } from '../scraper'; // Import your scraper function
import { createConnection, Connection } from 'mysql2/promise';
import { checkDatabaseExistence } from './databaseCheck';
import { connectToDatabase, insertProduct } from './database';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';
import { ProductRow } from './database';
import { RowDataPacket } from 'mysql2/promise';



const databaseConfig = {
    host: 'your_host',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  };

  

export async function scrapeAndStoreProduct(productURL: string) {
    try {
      // Scrape product data
      const scrapedProduct = await scrapeAmazonProduct(productURL);
      if (!scrapedProduct) {
        throw new Error('Failed to scrape product data');
      }
  
      // Connect to the database
      const connection = await connectToDatabase();
  
      // Insert product into the database
      const [existingProductRows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM products WHERE url = ?',
        [scrapedProduct.url]
      );
      
      if (existingProductRows && existingProductRows.length > 0) {
        const existingProduct: ProductRow = existingProductRows[0] as ProductRow;
        // Parse the priceHistory string back into an array
        const priceHistory: any[] = existingProduct.priceHistory || [];
        const existingPriceHistory = priceHistory || [];
        const updatedPriceHistory = [...existingPriceHistory, { price: scrapedProduct.currentPrice }];
        const lowestPrice = getLowestPrice(updatedPriceHistory);
        const highestPrice = getHighestPrice(updatedPriceHistory);
        const averagePrice = getAveragePrice(updatedPriceHistory);
  
        // Modify the scrapedProduct object
        scrapedProduct.priceHistory = updatedPriceHistory;
        scrapedProduct.lowestPrice = lowestPrice;
        scrapedProduct.highestPrice = highestPrice;
        scrapedProduct.average = averagePrice;
  
      
        // Update the product in the database
        await updateProduct(connection, scrapedProduct); // Implement the updateProduct function
      } else {
        // Product doesn't exist, insert a new one
        await insertProduct(connection, scrapedProduct);
      }
      // Close the database connection
      await connection.end();
  
      console.log('Product data saved to SQL database');
    } catch (error:any) {
      console.error('Error scraping and storing product:', error.message);
    }
  }

  export async function getProductById(productId: string) {
    try {
      const connection = await createConnection(databaseConfig);
  
      const [productRows] = await connection.execute(
        'SELECT * FROM products WHERE id = ?',
        [productId]
      );
  
      await connection.end();
  
      if (!productRows || productRows.length === 0) {
        return null; // Product not found
      }
  
      const product = productRows[0]; // Assuming the query returns a single product
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error.message);
      throw error;
    }
  }
  