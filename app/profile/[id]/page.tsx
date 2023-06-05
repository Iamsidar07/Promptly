'use client'
import Profile from '@/components/Profile'
import { Creator, Post } from '@/types'
import { NextPage } from 'next'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {}

const MyProfile: NextPage = (props: Props) => {
    const { id } = useParams();
    console.log(id);
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<Creator>();
    console.log({ posts })

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/prompt/${id}`)
            const data = await res.json()
            console.log(data)
            setPosts(data)
        }
        const fetchUser = async () => {
            const res = await fetch(`/api/profile/${id}`)
            const data = await res.json()
            console.log(data)
            setUser(data)
        }
        fetchUser();
        fetchPosts()
    }, [])
    return (
        <Profile
            userDetails={user}
            data={posts}
        />
    )
}

export default MyProfile