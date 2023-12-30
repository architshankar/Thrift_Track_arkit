'use server'

import { scrapeAmazonProduct } from "../scraper"

export async function scrapeAndStoreProduct(productURL: string){
    if(!productURL) return

    try {
        const scrpedProduct = await scrapeAmazonProduct(productURL)
        if (!scrpedProduct) return
        //scraping part is done storing has to start 

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}












