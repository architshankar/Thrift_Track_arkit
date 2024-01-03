// in Next.js, square brackets [id] in the folder name could indicate a dynamic route parameter. When a URL matches this pattern (/products/[id]/page.tsx), it suggests that id is a variable segment of the URL, and the corresponding page component (page.tsx) would be responsible for rendering content based on the value of id.

import {getPruductByID} from '@/lib/actions'
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
              <Link 
              href={product.url}
              target='_blank'
              className='text-base text-black opacity-70'
              >Visit Product
              </Link>
            </div>
            <div className='flex items-center gap-3'>
              <div className='product-hearts'>
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt='heart'
                  width={20}
                  height={20}
                />
                <p className='text-base font-semibold text-[#D46F77]'>
                  {product.reviewsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDeatails