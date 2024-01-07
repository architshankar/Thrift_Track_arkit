import React from 'react'
import Image from 'next/image'
import Searchbar from '@/Components/Searchbar'
import HeroCarousel from '@/Components/HeroCarousel'
import { getAllProducts} from '@/lib/actions'
import ProductCard from '@/Components/productCard'

const Home = async () => {

  const reversedProducts = await getAllProducts();
  const allProducts = reversedProducts?.slice().reverse();
  return (
    <>
      <section className='px-6 md:px-20 py-24 '>
        <div className='flex max-xl:flex-col gap-16 '>
          <div className='flex-col justify-center  items-center '>
            <a className='small-text' href='https://amazon.in' target='_blank' rel='noopener noreferrer'>
              Smart Shopping Start Here:
              <Image
                src='/assets/icons/arrow-right.svg'
                alt='arrow-right'
                width={16}
                height={16}
              />
            </a>
            <h1 className='head-text'>Unleash the Power of 
              <span className='text-primary'> ThiftTrack</span>
            </h1>
            <p className='mt-6'>
             Effortlessly track prices across the web, ensuring you never miss a deal.
             Empower your savings journey with comprehensive, real-time price 
             monitoring and smart alerts
            </p>
            <Image
                src='/assets/icons/intro.png'
                alt='arrow-right'
                width={720}
                height={720}
                className='mx-auto'
              />
            <Searchbar/>
          </div>

          <HeroCarousel />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text flex self-center'>Trending </h2>

          <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {allProducts?.map((product) =>(
                <ProductCard  key ={product._id} product = {product} />
              ))
            }
          </div>
      </section>

    </>
  )
}

export default Home