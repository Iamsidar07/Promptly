'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { Post } from '@/types';


interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}

export const PromptCardList = ({ data, handleTagClick, handleDelete, handleEdit, }: PromptCardListProps) => {

  if (data.length === 0) {
    return (<></>)
  }
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
      {
        data.map((item, i) => <PromptCard
          key={item._id}
          data={item}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />)
      }
    </div>
  )
}

const Feed = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResultPosts,setSearchResultPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])

 const handleTagClick = (tag: string) => {
    setSearchValue(tag)
 }
 
 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value)
    setSearchValue(e.target.value);
 }

 useEffect(() => {
    const resultFilteredPosts = posts.filter((post) => post.prompt.toLowerCase().includes(searchValue.toLowerCase()) || post.tags.includes(searchValue.toLowerCase()) || post.creator.username.toLowerCase().includes(searchValue.toLowerCase()) );
    console.log({resultFilteredPosts})
    setSearchResultPosts(resultFilteredPosts)
 }, [searchValue,posts])

 //write a function to search by username,prompt, or tag
  //filter the posts based on the search value
  //if the search value is empty, return all posts
  //if the search value is not empty, return the posts that match the search value



  return (
    <section className='w-full flex flex-col items-center mt-6 mb-12'>
      <form className='relative w-full flex flex-col items-center max-w-sm mx-auto mb-6'>
        <input className='focus:outline-none focus:ring-0 focus:border-black  border border-gray-200 rounded-md w-full p-2 bg-white font-poppins shadow-sm pl-4'
          onChange={handleSearchChange}
          value={searchValue}
          required
          spellCheck={false}
          placeholder='Search by username or prompt...'
        />
      </form>
      <PromptCardList 
      data={searchValue.length === 0 ? posts : searchResultPosts} 
      handleTagClick={handleTagClick} />
    </section>
  )
}



export default Feed