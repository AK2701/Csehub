import { Background } from '../../public/assets/paperbg.jpg';
import Image from 'next/image';
import { HeadingDiv } from './styles'

const index = ({ scrollY }) => {
    return (
        <div style={{
            backgroundImage: `url('/assets/paperbg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className='w-screen h-screen overflow-hidden' >
            <div className='w-screen flex justify-center items-center'>
                <div className='w-full mt-24 md:mt-5 xl:mt-18 2xl:mt-24 sm:w-4/5 md:w-3/5 flex justify-center h-full'>
                    <Image src='/assets/dragoneatingcrew.svg' width={700} height={500} />
                </div>
            </div>
            <div className='w-screen flex justify-center items-center'>
                <div className='w-4/5 sm:w-3/5 border-t-2 border-black mt-8 flex justify-center h-full'>
                    <HeadingDiv>
                        <p className='text-4xl md:text-5xl'>...to remove all the barriers in the path of study 🔐</p>
                    </HeadingDiv>
                </div>
            </div>
            <div className='w-screen flex mt-2 justify-center'>
                <div className='w-20 h-11 md:w-24 md:h-12 border-2 border-amber-900'>
                    <button onClick={scrollY} className='hover:mt-0.5 hover:ml-0.5 mt-1 ml-1 w-20 h-11 md:w-24 md:h-12  border-2 border-amber-900'>
                        <HeadingDiv className="-mt-3 -ml-2">
                            <p className='text-xl md:text-2xl'>Explore..</p>
                        </HeadingDiv>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default index;