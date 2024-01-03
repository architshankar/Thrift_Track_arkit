'use server'

import { revalidatePath } from "next/cache";
import Product from "../model/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productURL: string){
    if(!productURL) return

    try {
      connectToDB();
  
      const scrapedProduct = await scrapeAmazonProduct(productURL);
  
      if(!scrapedProduct) return;
  
      let product = scrapedProduct;
  
      const existingProduct = await Product.findOne({ url: scrapedProduct.url });
  
      if(existingProduct) {
        const updatedPriceHistory: any = [
          ...existingProduct.priceHistory,
          { price: scrapedProduct.currentPrice }
        ]
  
        product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          average: getAveragePrice(updatedPriceHistory),
        }
      }
  
      const newProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        product,
        { upsert: true, new: true }
      );
      
      //here we are redirecting towards the unique pruduct id by mongoDB 
      revalidatePath(`/products/${newProduct._id}`);
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`)
    }
  }


export async function getPruductByID(productId: string){

  try {
    connectToDB();

    const product = await Product.findOne({_id:productId})
    if(!product) 
      return null

    return product
  } catch (error) {
    console.log(error)
  }
}


export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find()
    return products
  } catch (error) {
    console.log(error)
  }
}