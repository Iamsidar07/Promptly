'use client'
import { Profile } from '@/components';
import { Creator, Post } from '@/types';
import { useEffect, useState } from 'react';

const MyProfile = ({ params }: { params:{ id: string } }) => {
    const { id } = params;
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<Creator>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const promptRes = await fetch(`/api/prompt/${id}`);
                const profileRes = await fetch(`/api/profile/${id}`);
                const promptdata = await promptRes.json();
                const profiledata = await profileRes.json();
                setPosts(promptdata);
                setUser(profiledata);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [id]);

    return (
        <Profile
            isLoading={isLoading}
            userDetails={user}
            data={posts}
        />
    )
}

export default MyProfile