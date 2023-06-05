'use client'
import { Post } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { use, useState } from 'react'

interface PromptCardProps {
  data:Post;
  handleTagClick: (tag: string) => void;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}

const PromptCard = ({data,handleDelete, handleEdit, handleTagClick}: PromptCardProps) => {
  const {data:session} = useSession();
  const path = usePathname();
  const [isCopied,setIsCopied] = useState(false);


  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }

  return (
    <div className='w-full max-w-md mx-auto bg-white rounded border py-2 space-y-2 shadow-sm sm:hover:scale-105 sm:hover:translate-y-1 hover:border-black transition-all duration-100 ease-in h-fit'>
      <div className="flex mb-2 items-center px-2 justify-between">
        <Link href={`/profile/${data?.creator._id}?username=${data?.creator.username}`} className="flex space-x-2  items-center ">
          <Image src={data.creator.image}
            width={20}
            height={20}
            alt='User image'
            className='object-contain bg-white rounded-full shadow'
          />
          <span className='font-semibold'>@{data.creator.username}</span>
        </Link>

          <Image src={`/assets/icons/${isCopied ? 'tick' : 'copy'}.svg`}
            width={16}
            height={16}
            alt='Copy button'
            className='object-contain cursor-pointer'
            onClick={() => copyToClipboard(data.prompt)}
          />
      </div>
      <div className='border-b '></div>
      
      <p className='mb-2 px-2.5'>{data.prompt}</p>
      <div className='px-2 flex flex-wrap gap-2'>
        {
          data.tags.split(',').map((tag) => <span key={tag} onClick={()=>handleTagClick(tag)} className='rounded-full border-[0.3px] border-orange-400 bg-orange-200 px-2 py-0.5 text-xs cursor-pointer'>#{tag}</span>)
        }
      </div>
      {
        session?.user?.id === data.creator._id && path === '/profile' && <div className=' border-t'>
        <div className='flex items-center justify-center space-x-2 mt-4'>
          <button className='bg-white border text-gray-800 rounded-full px-4 py-1 text-sm ' onClick={() =>handleEdit &&  handleEdit(data._id)}>Edit</button>
          <button className='bg-orange-500 text-white rounded-full px-4 py-1 text-sm ' onClick={() =>handleDelete &&  handleDelete(data._id)}>Delete</button>
        </div>
        </div> 
          
      }
      
    </div>
  )
}

export default PromptCard