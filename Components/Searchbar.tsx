'use client'

import { scrapeAndStoreProduct } from "@/lib/actions"
import { scrapeAmazonProduct } from "@/lib/scraper"
import { useSelectedLayoutSegment } from "next/navigation"
import { hostname } from "os"
import { FormEvent, useState } from "react"

//If the handleSubmit function involves client-side actions like data validation or navigation without page reloads, marking the component as a Client Component using use client would be appropriate.


const isValidAmazonLink = (url: string) =>{
  try{
    const parsedURL = new URL(url)
    const hostName = parsedURL.hostname
    //to check is it has amzon url
    if(
      hostName.includes('amazon.com')||
      hostName.includes('amazon.')||
      hostName.endsWith('amazon')){
        return true
      }
  }catch(error){
    return false
  }
  

  return false
}

/*
const url = 'https://www.example.com/path?key=value';
const parsedURL = new URL(url);

parsedURL.protocol returns the protocol used ('https:' in this case).
parsedURL.hostname returns the domain name ('www.example.com' in this case).
parsedURL.pathname returns the path ('/path' in this case).
parsedURL.search returns the query string ('?key=value' in this case).
*/


const Searchbar = () => {
  
  const [SearchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const handleSubmit =async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // this is used so that it dosent reload while it is submitted
    
    const isValidLink= isValidAmazonLink(SearchPrompt)
    // check Link - https://www.amazon.in/Colombian-Hazelnut-Instant-Coffee-Sachets
    if(!isValidLink) return alert('Please enter a valid amazon link')
    //else alert("valid")
    try {
      setisLoading(true)
      //scraping begins here
      const poduct = await scrapeAndStoreProduct(SearchPrompt) 

    } catch (error) {
      console.log(error)
    } finally{
      setisLoading(false)
    }
  }

  return (
    <form 
    className='flex flex-wrap gap-4 mt-12' 
    onSubmit={handleSubmit}
    >
      <input 
      type="text"
      value={SearchPrompt}
      onChange={(e)=>setSearchPrompt(e.target.value)}
      placeholder="Enter product Link"
      className="searchbar-input"
      />
      <button 
        type="submit"
        className="searchbar-btn"
        disabled={SearchPrompt === ''}
        >
          {isLoading ? "Searching..." : "Search"}
      </button>

    </form>
  )
}

export default Searchbar