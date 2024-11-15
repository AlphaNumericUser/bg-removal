import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40' >

        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold
            bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'
            >
            Steps to remove background <br/>  image in seconds
        </h1>

        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center' >

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded
                hover:scale-105 transition-all duration-500' >
                <img className='max-w-9' src={ assets.upload_icon } alt="upload icon" />
                <div>
                    <p className='text-xl font-medium' >
                    Step 1: Upload Your Image
                    </p>
                    <p className='text-sm text-neutral-500 mt-1' >
                    Select the image you want to edit. <br/> You can upload any format, and our tool will handle the rest.
                    </p>
                </div>
            </div>

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded
                hover:scale-105 transition-all duration-500' >
                <img className='max-w-9' src={ assets.remove_bg_icon } alt="upload icon" />
                <div>
                    <p className='text-xl font-medium' >
                    Step 2: Remove Background
                    </p>
                    <p className='text-sm text-neutral-500 mt-1' >
                    Our AI automatically detects and removes the background, <br/> leaving you with a clean, transparent (PNG) image.
                    </p>
                </div>
            </div>

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded
                hover:scale-105 transition-all duration-500' >
                <img className='max-w-9' src={ assets.download_icon } alt="upload icon" />
                <div>
                    <p className='text-xl font-medium' >
                    Step 3: Download Your Image
                    </p>
                    <p className='text-sm text-neutral-500 mt-1' >
                    Click to download your edited image with <br/> a transparent background, ready to use anywhere.
                    </p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Steps