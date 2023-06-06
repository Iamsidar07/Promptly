'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
type Props = {}

const Nav = (props: Props) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [isToggleDropDown, setIsToggleDropDown] = useState<boolean>(false);
  const isUserLoggedIn = session?.user ? true : false;

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setupProviders();
  }, [])

  return (
    <nav className='border bg-white/30 backdrop-blur-sm sticky top-0 z-50 mb-16 '>
      <div className='w-full flex items-center justify-between p-2  max-w-6xl mx-auto'>
        <Link href={'/'} className='flex gap-2 items-center'>
          <Image
            src={'/assets/icons/terminal.svg'}
            alt='Promptly Logo'
            width={25}
            height={25}
            className='cursor-pointer objcet-contain'
          />
          <p className='font-semibold text-lg'>Promptly</p>
        </Link>

        {/* Desktop Navigation  */}
        <div className='hidden sm:flex'>
          {
            isUserLoggedIn ? (<div className='flex gap-3 md:gap-5 items-center'>
              <Link href={'/create-prompt'} className='text-white shadow-lg bg-gradient-to-r from-orange-700 to-yellow-500 cursor-pointer rounded-full py-2 px-5 md:px-7  hover:opacity-75 hover:bg-transparent transition-all duration-150 ease-linear'>
                Create Prompt
              </Link>
              <button type='button' className='bg-white cursor-pointer rounded-full border py-2 px-5  hover:bg-black hover:text-white transition-all duration-150 ease-in'
                onClick={() => signOut()}>
                Sign Out
              </button>
              <Link href={'/profile'}>
                <Image
                  src={session?.user?.image || '/assets/images/user.svg'}
                  alt='Profile Picture'
                  width={27}
                  height={27}
                  className='cursor-pointer objcet-contain rounded-full'
                />
              </Link>

            </div>) :
              (<>
                {providers && Object.values(providers).map((provider: any) => <button key={provider.id}
                  onClick={() => signIn(provider.id)} type='button'
                  className='text-white bg-gradient-to-r from-orange-500 to-yellow-200 cursor-pointer rounded-full py-3 px-5 md:px-7 hover:opacity-90 transition-all duration-200 ease-in flex items-center '>
                  <Image
                    src={'/assets/icons/github.svg'}
                    alt='github Logo'
                    width={25}
                    height={25}
                    className='cursor-pointer objcet-contain mr-2'
                  />Sign In with {provider.name}</button>)}
              </>)
          }
        </div>

        {/* Mobile Navigation  */}
        <div className='sm:hidden flex relative'>
          {isUserLoggedIn ? (<div className='flex'>
            <Image
              src={session?.user?.image || '/assets/images/user.svg'}
              alt='Profile Picture'
              width={30}
              height={30}
              className='cursor-pointer shadow rounded-full objcet-contain'
              onClick={() => {
                setIsToggleDropDown((prevState) => !prevState);
              }}
            />
            {
              isToggleDropDown ? (<div className='dropdown'>
                <Link
                  href={'/profile'}
                  className='p-1.5 border-b border-gray-200 w-full'
                  onClick={() => setIsToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href={'/create-prompt'}
                  className='p-1.5 border-b border-gray-200 w-full'
                  onClick={() => setIsToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button type='button' className='bg-black text-white rounded-full p-1.5 w-full mt-5'
                  onClick={() => {
                    setIsToggleDropDown(false);
                    signOut();
                  }}>
                  Sign Out
                </button>

              </div>) : null
            }
          </div>) : (<>
            {providers && Object.values(providers).map((provider: any) => <button key={provider.id}
              onClick={() => signIn(provider.id)} type='button'
              className='text-white bg-gradient-to-r from-orange-500 to-yellow-200 cursor-pointer rounded-full py-2 px-5 md:px-7 hover:opacity-90 transition-all duration-200 ease-in flex items-center '>
              <Image
                src={'/assets/icons/github.svg'}
                alt='github Logo'
                width={25}
                height={25}
                className='cursor-pointer objcet-contain mr-2'
              />Sign In with {provider.name}</button>)}
          </>)}
        </div>
      </div>
    </nav>
  )
}

export default Nav