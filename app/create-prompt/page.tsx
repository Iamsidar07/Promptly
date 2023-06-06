'use client'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { Prompt } from '@/types'
import { useSession } from 'next-auth/react'
import Form from '@/components/Form'
import { useRouter } from 'next/navigation'


type Props = {}

const CreatePrompt: NextPage = (props: Props) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Prompt>({
        prompt: '',
        tags: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            //call the api
            const respose = await fetch('/api/prompt/new', {
                method:'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: post.tags,
                    userId:session?.user?.id
                }),
            })
            if (respose.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsSubmitting(false);
        }
    }
    return (
        <Form
            type='Create Post🖌️'
            post={post}
            setPost={setPost}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
        />
    )
}

export default CreatePrompt