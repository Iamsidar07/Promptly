import { Prompt } from '@/types'
import Link from 'next/link'

interface FormProps {
  type: string,
  post: Prompt,
  setPost: React.Dispatch<React.SetStateAction<Prompt>>,
  isSubmitting: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
}

const Form = ({ type, handleSubmit, isSubmitting, post, setPost }: FormProps) => {
  return (
    <section className='w-full max-w-5xl space-y-4 mx-auto mb-8'>
      <h1 className='text-4xl sm:text-6xl font-semibold'>{type}</h1>
      <p className='mt-4 max-w-xl'>Step into the realm of creative expression. Create your perfect prompts and contribute to the vibrant tapestry of inspiration. Join our community of passionate creators and let your ideas shape the world of art, writing, and beyond.</p>

      <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-2 w-full'>
        <label className='font-semibold '>
          Your 🤖AI Prompt
        </label>
        <textarea className='focus:outline-none focus:ring-0 focus:border-black  border border-gray-200 rounded-md  p-2 pl-4 bg-white font-poppins shadow-sm'
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          value={post.prompt}
          placeholder='Enter your prompt here...'
          spellCheck={false}
          required
          rows={3}
        >
          {post.prompt}
        </textarea>
        <label className='font-semibold '>
          tags{' '}
          <span className='text-gray-500 font-light'>sperated tags by ,</span>
        </label>
        <input className='focus:outline-none focus:ring-0 focus:border-black  border border-gray-200 rounded-md  p-2 bg-white font-poppins shadow-sm pl-4'
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
          value={post.tags}
          required
          spellCheck={false}
          placeholder='web development, coding, programming'
        />
        <div className='flex justify-end items-center space-x-2'>
          <Link href='/' className='bg-white cursor-pointer rounded-full border py-1.5 px-6  hover:bg-black hover:text-white transition-all duration-150 ease-in'>Cancel</Link>
          <button
            type='submit'
            disabled={isSubmitting}
            className='border border-gray-200 bg-gradient-to-r from-orange-700 to-orange-600 backdrop-blur-sm rounded-full px-6 py-1.5 text-white font-poppins'>
            {
              isSubmitting ? `${type}...` : type
            }
          </button>
        </div>

      </form>

    </section>
  )
}

export default Form