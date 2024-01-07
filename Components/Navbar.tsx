import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const navIcons = [
    { src: '/assets/icons/black-heart.svg' , alt: 'heart'},
    { src: '/assets/icons/user.svg' , alt: 'user'},

]

const Navbar = () => {
    const handleClick = () => {
        // Perform the action when the logo is clicked
        alert('Logo clicked!'); // You can replace this with your desired action
      };
  return (
    <header className='w-full border-y border-y-[#E4E4E4]'>
        <nav className='nav'>
            <Link href='/' className='flex items-center gap-1'>   
                <Image 
                    src='/assets/icons/logo.svg'
                    width={27}
                    height={27}
                    alt='logo'
                />
                <p className='nav-logo'>
                    Thrift<span className='text-primary'>Track</span>
                </p>
            </Link>
            <div className='flex item-center gap-10'>
            
            <Link href='/' className='flex items-center gap-1'>   
                <Image 
                    src='/assets/icons/search.svg'
                    width={28}
                    height={28}
                    alt='search_icon_nav'
                    className='object-contain'
                />
            </Link>
                {navIcons.map((icon)=>(
                    <Image
                        key = {icon.alt}
                        src={icon.src}
                        alt={icon.alt}
                        width={28}
                        height={28}
                        className='object-contain'
                    />
                ))}
            </div>
        </nav>
    </header>
  )
}

export default Navbar