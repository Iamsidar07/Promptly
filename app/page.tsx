import { Feed } from '@/components';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <section className='w-full flex flex-col items-center'>
      <h1 className='text-5xl sm:text-6xl font-bold text-center '>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#007cf0] to-[#00dfd8]  text-center'>Sparking</span><br className='sm:hidden' /> <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#7928ca] to-[#ff0080]  text-center'>Creativity </span>
        <br className='sm:hidden' />
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#f9cb28]  text-center'>Luminescence</span>
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