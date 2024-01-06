// in Next.js, square brackets [id] in the folder name could indicate a dynamic route parameter. When a URL matches this pattern (/products/[id]/page.tsx), it suggests that id is a variable segment of the URL, and the corresponding page component (page.tsx) would be responsible for rendering content based on the value of id.

import Modal from '@/Components/Modal'
import PriceInfoCard from '@/Components/PriceInfoCard'
import ProductCard from '@/Components/productCard'
import {getPruductByID, getSimilarProducts} from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

//props are objects that hold information passed to a component. They allow you to pass data from a parent component to a child component.
type Props ={
  params: {id:string}
}

const ProductDeatails = async ({params: {id}}:Props) => {

  const product: Product= await getPruductByID(id) 

  const similarProducts = await getSimilarProducts(id)

  if(!product)
    redirect('/')

  
  return (
    <div className='product-container'>
      <div className='flex gap-28 xl:flex-row flex-col'>
        <div className='product-image'>
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className='mx-auto'
          />
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] text-secondary font-semibold'>{product.title}</p>
            </div>
            <div className='flex items-center gap-3 mt-12'>
              <div className='product-hearts'>
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt='heart'
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>
              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt='bookmark'
                  width={20}
                  height={20}
                />
              </div>
              <div className='p-2 bg-white-200 rounded-10'>
                <Image
                  src="/assets/icons/share.svg"
                  alt='share'
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className='product-info flex justify-between'>
            <div className='flex flex-col gap-2'>
              <p className='text-[34px] text-secondary font-bold'>
                {product.currency}{formatNumber(product.currentPrice)}
              </p>
              <p className='text-[21px] text-black opacity-60 line-through'>
                {product.currency}{formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className='searchbar-btn'>
              <a
                href={product.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-base opacity-70 cursor-pointer'
                style={{ color: '#eab308' }}
              >
                Visit Product
              </a>
            </div>
          </div>
            <div className='product-stars mt-8'>
              <span>Delivery details:</span>
              <p className='text-sm text-black opacity-60'>
                {product.deliveryText}
              </p>
            </div>
            <div className='my-7 grid-container'>
              <PriceInfoCard
                  title='Current price'
                  iconSrc='/assets/icons/price-tag.svg'
                  value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />
              <PriceInfoCard
                  title='Average price'
                  iconSrc='/assets/icons/chart.svg'
                  value={`${product.currency} ${formatNumber(product.average)}`}
              />
              <PriceInfoCard
                  title='Highest price'
                  iconSrc='/assets/icons/arrow-up.svg'
                  value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />
              <PriceInfoCard
                  title='Lowest price'
                  iconSrc='/assets/icons/arrow-down.svg'
                  value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>
            <Modal productId={id}/>
        </div>
        {/*<PriceHistoryChart priceHistory={product.priceHistory} />*/}
      </div>
      <div className='flex flex-col gap-16 '> 
        <div className='flex flex-col gap-5'>
          <h3 className='text-2xl text-secondary font-semibold'>
            Product Description :
          </h3>
            <div className='flex flex-4 gap-4'>
            <ul  className="list-disc pl-4 text-gray-600">
              {product?.description?.split('\n').map((line, index) => (
                <li key={index} className="mb-2">{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className='inline-flex mx-auto w-fit items-center justify-center gap-3 
                            min-w-[200px] btn'>
          <Image
            src="/assets/icons/bag.svg"
            alt="Add to cart button"
            width={22}
            height={22}
          />
          <Link href={product.url} target='_blank' className='text-base text-white'>
            Buy Now
          </Link>
        </button>
      </div>
      {similarProducts && similarProducts?.length>0 &&(
        <div className='py-14 flex flex-col gap-2 w-full'>
          <p className='section-text'>Similar Products</p>
          <div className='flex flex-wrap gap-10 mt-7 w-full'>
            {similarProducts.map((product)=>
              <ProductCard key={product._id} product={product}/>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDeatails