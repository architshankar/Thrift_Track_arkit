import { generateEmailBody, sendEmail } from "@/lib/Node Mailer"
import Product from "@/lib/model/product.model"
import { connectToDB } from "@/lib/mongoose"
import { scrapeAmazonProduct } from "@/lib/scraper"
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        connectToDB()
        const products = await Product.find({})
        if(!products) throw new Error('No product found')
        //1 scrape latest details & update db
        const updatedProducts = await Promise.all(
            products.map(async(currentProduct)=>{
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url)
                if(!scrapedProduct) throw new Error('This product not found ')

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                      { price: scrapedProduct.currentPrice }
                  ]
            
                const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    average: getAveragePrice(updatedPriceHistory),
                  }
                
            
                const updatedProduct = await Product.findOneAndUpdate(
                  { url: scrapedProduct.url },
                  product,
                  { upsert: true, new: true }
                );

                // Check each product status and send email accordingly

                const emailNotifType = getEmailNotifType(scrapedProduct,currentProduct)

                if(emailNotifType && updatedProduct.users.length>0){
                    const productInfo={
                        title: updatedProduct.title,
                        url: updatedProduct.url
                    }

                    const EmailContent= await generateEmailBody(productInfo, emailNotifType,product.image)

                    const userEmails=updatedProduct.user.map((user:any)=>user.email)

                    await sendEmail(EmailContent,userEmails)
                }
                return updatedProduct
            })
        )
    return NextResponse.json({
        message:"Successfully added products to database",
        data: updatedProducts
    })
    } catch (error) {
        throw new Error(`Error in GET: ${error}`)
    }
}