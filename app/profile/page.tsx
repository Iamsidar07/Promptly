'use client'
import Profile from '@/components/Profile'
import { Post } from '@/types'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}


const MyProfile:NextPage = (props: Props) => {
  const {data: session} = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  console.log({posts})
  const handleTagClick = (tag: string) => {}
  const handleDelete = async(id: string) => {
    console.log({id});
    const isConfirmed = confirm('🗑️ Are you sure you want to delete this prompt?');
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/prompt/edit/${id}`,{
        method:'DELETE'
      })
      const data = await res.json();
      console.log({data});
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = (id: string) => {
    console.log({id});
    router.push(`/edit-prompt?id=${id}`);
  }
  useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt')
            const data = await res.json()
            setPosts(data)
        }

        fetchPosts()
    }, [posts])
  return (
   <Profile
   userDetails={session?.user}
   data={posts}
   handleTagClick={handleTagClick}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   />
  )
}

export default MyProfile