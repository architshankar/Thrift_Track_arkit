import React from 'react'
import Image from 'next/image'
import Searchbar from '@/Components/Searchbar'
import HeroCarousel from '@/Components/HeroCarousel'

const Home = () => {
  return (
    <>
      <section className='px-6 md:px-20 py-24 border-2 border-red-700'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping Start Here:
              <Image
                src='/assets/icons/arrow-right.svg'
                alt='arrow-right'
                width={16}
                height={16}
              />
            </p>
            <h1 className='head-text'>Unleash the Power of 
              <span className='text-primary'> ThiftTrack</span>
            </h1>
            <p className='mt-6'>
             Effortlessly track prices across the web, ensuring you never miss a deal.
             Empower your savings journey with comprehensive, real-time price 
             monitoring and smart alerts
            </p>

            <Searchbar/>
          </div>

          <HeroCarousel />
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending </h2>

          <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {['Apple Iphone 14','Book','Sneakers'].map
              ((product) =>(
                <div>{product}</div>
              ))
            }

          </div>
      </section>

    </>
  )
}

export default Home