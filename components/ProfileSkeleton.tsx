const ProfileSkeleton = () => {
  return (
      <div className='bg-gradient-radial from-orange-600 to-yellow-500 w-full h-36 rounded-t-md rounded-bl-md relative flex mb-20 -mt-10'>
          <div className='absolute -bottom-12 left-4 right-0 h-2/3 bg-white flex items-center rounded-lg rounded-tr-none space-x-4 shadow'>
              <div className='w-[70px] h-[70px] rounded-full bg-gray-400 animate-pulse ml-2'></div>
              <div>
                  <p className=' w-36 h-4 bg-gray-400 animate-pulse'></p>
                  <p className=' w-44 h-4 bg-gray-400 animate-pulse mt-1'></p>
              </div>
          </div>

      </div>
  )
}

export default ProfileSkeleton;