'use client'
import { Profile } from '@/components';
import { Post } from '@/types';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  // fetch all prompts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, [posts]);

  // delete a particular prompt
  const handleDelete = async (id: string) => {
    const isConfirmed = confirm('🗑️ Are you sure, want to delete this prompt?');
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/prompt/edit/${id}`, {
        method: 'DELETE'
      });
      await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  // edit a particular prompt
  const handleEdit = (id: string) => {
    router.push(`/edit-prompt?id=${id}`);
  }
  
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

export default MyProfile;