'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { Post } from '@/types';
import PromptCardSkeleton from './PromptCardSkeleton';


interface PromptCardListProps {
  isLoading?: boolean;
  data: Post[];
  handleTagClick?: (tag: string) => void;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}

export const PromptCardList = ({ isLoading, data, handleTagClick, handleDelete, handleEdit, }: PromptCardListProps) => {

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 mb-12 '>
      {
        isLoading && Array(8).fill(0).map((_,i)=>{
          return <PromptCardSkeleton key={i}/>
        })
      }
      
      {
        data?.map((item, i) => <PromptCard
          key={item._id}
          data={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
        />)
      }
    </div>
  )
}

const Feed = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResultPosts,setSearchResultPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading,setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/prompt')
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
      
    }
    fetchPosts()
  }, [])

 const handleTagClick = (tag: string) => {
    setSearchValue(tag)
 }
 
 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
 }

 useEffect(() => {
    const resultFilteredPosts = posts.filter((post) => post.prompt.toLowerCase().includes(searchValue.toLowerCase()) || post.tags.includes(searchValue.toLowerCase()) || post.creator.username.toLowerCase().includes(searchValue.toLowerCase()) );
    setSearchResultPosts(resultFilteredPosts)
 }, [searchValue,posts])

  return (
    <section className='w-full flex flex-col items-center mt-6 mb-12'>
      <form className='relative w-full flex flex-col items-center max-w-sm mx-auto mb-6'>
        <input className='focus:outline-none focus:ring-0 focus:border-black  border border-gray-200 rounded-md w-full p-2 bg-white font-poppins shadow-sm pl-4'
          onChange={handleSearchChange}
          value={searchValue}
          required
          spellCheck={false}
          placeholder='Search by username, tag or prompt...'
        />
      </form>
      <PromptCardList 
      isLoading={isLoading}
      data={searchValue.length === 0 ? posts : searchResultPosts} 
      handleTagClick={handleTagClick} />
    </section>
  )
}



export default Feed