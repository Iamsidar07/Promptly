const PromptCardSkeleton = () => {
    return (
        <div className='w-full max-w-md mx-auto bg-white rounded border py-2 space-y-2 shadow-sm sm:hover:scale-105 sm:hover:translate-y-1 hover:border-black transition-all duration-100 ease-in h-fit'>
            <div className="flex mb-2 items-center px-2 justify-between">
                <div className="flex space-x-2  items-center ">
                    <div className='w-6 h-6 rounded-full bg-gray-400 animate-pulse'></div>
                    <span className='font-semibold bg-gray-400 animate-pulse w-32 h-4'></span>
                </div>
                <div className='w-4 h-4 rounded bg-gray-400 animate-pulse'></div>
            </div>
            <div className='border-b p-2'>
                <p className='px-2.5 w-full h-5 bg-gray-400 animate-pulse'></p>
                <p className='mt-1 px-2.5 w-full h-5 bg-gray-400 animate-pulse'></p>
                <p className='mt-1 px-2.5 w-full h-5 bg-gray-400 animate-pulse'></p>
            </div>
            <div className='px-2 flex flex-wrap gap-2'>
                {
                    Array(6).fill(0).map((_, i) => <span key={i} className='rounded-full px-2 py-2 cursor-pointer bg-gray-400 animate-pulse w-12'></span>)
                }
            </div>
        </div>
    )
}
export default PromptCardSkeleton;