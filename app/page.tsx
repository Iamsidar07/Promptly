import Feed from '@/components/Feed'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <section className='w-full flex flex-col items-center'>
        <h1 className='text-4xl sm:text-6xl font-semibold text-center '>
        Sparking Creativity with
            <br/>
        <span className='orange_gradient text-center'>Luminescence</span>
        </h1>
        <p className='mt-4 text-center max-w-xs md:max-w-md tracking-wide text-gray-800 '>
        Unlock infinite possibilities for your creative journey. Join Promptly,luminary sparks that ignite imagination.
        </p>

        {/* feed  */}
        <Feed />

    </section>
  )
}

export default Home