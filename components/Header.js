import React from 'react'
import Image from "next/image";
import {HiOutlineSearch} from "react-icons/hi";
import { CgMenuGridO } from "react-icons/cg"
import {HiOutlineHome } from "react-icons/hi"
import {MdOutlineOndemandVideo,MdOutlineExpandMore} from "react-icons/md"
import {RiFlag2Line} from "react-icons/ri"
import { AiFillMessage, AiFillBell, AiOutlineShop } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';



function Header() {
    const {data: session} = useSession();
  return (
    <div className='bg-white flex items-center p-2 shadow-md top-0 sticky z-50 h-16'>
        <div className="flex min-w-fit">
            <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
            height={40}
            width={40}
            />
            <div className='flex items-center space-x-2 px-2 ml-2 rounded-full bg-gray-100 text-gray-500'>
                <HiOutlineSearch size={20}/>
                <input className="hidden lg:inline-flex bg-transparent focus:outline-none" type="text" placeholder='Search Facebook' />
            </div> 
        </div>    
        <div className='flex flex-grow justify-center mx-2'>
            <div className="flex items-center">
                <div className="flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer">
                    <HiOutlineHome className='mx-auto text-blue-500' size={25}/>
                </div>
                <div className="flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer">
                    <RiFlag2Line className='mx-auto text-gray-500' size={25}/>
                </div>
                <div className="flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer">
                    <MdOutlineOndemandVideo className='mx-auto text-gray-500' size={25}/>
                </div>
                <div className="flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer">
                    <AiOutlineShop className='mx-auto text-gray-500' size={25}/>
                </div>
                <div className="flex items-center h-14 px-4 md:px-10 rounded-md md:hover:bg-gray-100 cursor-pointer">
                    <IoGameControllerOutline className='mx-auto text-gray-500' size={25}/>
                </div>
            </div>
            
        </div>
        <div className="flex items-center justify-end min-w-fit space-x-2">
            <Image 
            onClick={signOut}
            src={session?.user.image}
            alt='image'
            height={40}
            width={40}
            className=' rounded-full cursor-pointer'/>
            <p className='hidden xl:inline-flex font-semibold texr-sm whitespace-nowrap p-3 max-w-xs'>{session?.user.name.split(" ")[0]}</p>
            <CgMenuGridO
           size={20}
          className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
        />
        <AiFillMessage
           size={20}
          className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
        />
        <AiFillBell
           size={20}
          className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
        />
        <MdOutlineExpandMore
           size={20}
          className=" hidden lg:inline-flex h-10 w-10 bg-gray-200 text-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-300"
        />
        </div>
    </div>
  )
}

export default Header