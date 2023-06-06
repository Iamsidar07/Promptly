'use client'
import Profile from '@/components/Profile'
import { Post } from '@/types'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MyProfile:NextPage = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const handleDelete = async(id: string) => {
    const isConfirmed = confirm('🗑️ Are you sure you want to delete this prompt?');
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/prompt/edit/${id}`,{
        method:'DELETE'
      })
      const data = await res.json();
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = (id: string) => {
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
   isLoading={!posts.length}
   handleEdit={handleEdit}
   handleDelete={handleDelete}
   />
  )
}

export default MyProfile