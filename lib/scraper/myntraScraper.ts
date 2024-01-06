import axios from 'axios';
import * as cheerio from 'cheerio';

// export async function scrapeMyntraProduct(url: string) {
//     if (!url) return;
const url = 'https://www.myntra.com/jeans/nautica/nautica-men-straight-fit-low-rise-stretchable-jeans/25644964/buy';
(async () => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $('.pdp-title').text().trim();
        console.log('Product Title:', title);

        // Extracting Selling Price
        const sellingPriceElement = $('.pdp-price strong');
        let sellingPrice = '';
        if (sellingPriceElement.length > 0) {
            sellingPrice = sellingPriceElement.text().trim();
        }
        console.log('Selling Price:', sellingPrice);

        // Extracting Maximum Retail Price (MRP)
        const mrpElement = $('.pdp-mrp-verbiage-amt');
        let mrp = '';
        if (mrpElement.length > 0) {
            mrp = mrpElement.last().text().trim().split('Rs.')[1].trim();
        }
        console.log('Maximum Retail Price (MRP):', mrp);

        // Extracting Delivery Date
        const deliveryDateElement = $('.pincode-serviceabilityTitle');
        let deliveryDate = '';
        if (deliveryDateElement.length > 0) {
            deliveryDate = deliveryDateElement.text().trim();
        }
        console.log('Delivery Date:', deliveryDate);        


        // Assuming $ contains the Cheerio loaded HTML
        const imageContainer = $('.image-grid-imageContainer');
        let imageUrl = ''; // Initialize the imageUrl variable

        if (imageContainer.length > 0) {
            const backgroundImageStyle = imageContainer.find('.image-grid-image').attr('style'); // Get the inline style attribute

            if (backgroundImageStyle) {
                const urlMatches = backgroundImageStyle.match(/url\("(.+)"\)/); // Extract the URL from the inline style

                if (urlMatches && urlMatches.length > 1) {
                    imageUrl = urlMatches[1]; // Extracted image URL
                }
            }
        }

        console.log('Image URL:', imageUrl); // Output the extracted image URL

        const featuresElement = $('.pdp-product-description-content ul li');
        const featuresList: string[] = [];
        featuresElement.each((index, element) => {
            const featureText = $(element).text().trim();
            if (featureText) {
                featuresList.push(featureText);
            }
        });

        console.log('Product Description Features:', featuresList);

        // Construct the data object for Myntra
        // const data = {
        //     url,
        //     sellingPrice,
        //     mrp,
        //     // Add other extracted details here in a similar manner
        //     // Example: title, imageUrl, description, ratings, etc.
        // };

        // console.log(data);
        // return data;
    } catch (error: any) {
        throw new Error(`Failed to scrape Myntra data: ${error.message}`);
    }
})
