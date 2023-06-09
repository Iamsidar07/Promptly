'use client'
import { NextPage } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { Prompt } from '@/types';
import { Form } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt: NextPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Prompt>({
        prompt: '',
        tags: ''
    });

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/prompt/edit/${id}`);
            const data = await res.json();
            setPost(data);
        }

        fetchPost();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            //call the api
            const res = await fetch(`/api/prompt/edit/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(post),
            });
            if (res.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);

        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Form
            type='Edit Post🖌️'
            post={post}
            setPost={setPost}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
        />
    )
}

export default EditPrompt;