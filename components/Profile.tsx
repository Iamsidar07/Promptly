import { Creator, Post } from '@/types'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { PromptCardList } from './Feed';
import { usePathname } from 'next/navigation';
import ProfileSkeleton from './ProfileSkeleton';


type ProfileProps = {
  isLoading?: boolean,
  userDetails: Creator | any,
  data: Post[],
  handleTagClick?: (tag: string) => void,
  handleDelete?: (id: string) => void,
  handleEdit?: (id: string) => void,
}

const Profile = ({ userDetails, isLoading, data, handleDelete, handleEdit, handleTagClick, }: ProfileProps) => {
  const { data: session } = useSession();

  return (
    <section className='w-full'>
      {
        isLoading ? (
          <ProfileSkeleton />
        ) : (
      <div className='bg-gradient-radial from-orange-600 to-yellow-500 w-full h-36 rounded-t-md rounded-bl-md relative flex mb-20 -mt-10'>
        <div className='absolute -bottom-12 left-4 right-0 h-2/3 bg-white flex items-center rounded-lg rounded-tr-none space-x-4 shadow'>
          <Image
            src={userDetails?.image || 'https://api.multiavatar.com/avatar.svg'}
            alt='Profile Picture'
            width={70}
            height={70}
            className='rounded-full objcet-contain border-4 border-white shadow-md ml-2'
          />
          <div>
            <div className='flex items-center space-x-2'><p>@{userDetails?.username || userDetails?.name}</p>
              <Image
                src={'/assets/icons/verified.svg'}
                alt='Profile Picture'
                width={16}
                height={16}
                className='rounded-full objcet-contain '
              /></div>
            <p className='text-sm text-gray-800'>{userDetails?.email}</p>
          </div>
        </div>

      </div>
        )
      }



      <PromptCardList
        isLoading={isLoading}
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />



    </section>
  )
}

export default Profile