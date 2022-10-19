import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'

const index = ({ title, url, slug }) => {
    console.log(slug);
    return (
        <motion.div
            className="relative my-16 mx-auto sm:max-w-xs w-56">
            <div className="w-full h-[200px] md:h-[300px] bg-[#F2E9E4] absolute -top-8 -left-4">
                <span
                    className="absolute bottom-4 left-2 leading-none rotate-180 [writing-mode:vertical-lr]  text-black inline-blocks uppercase tracking-widest">{title}</span>
            </div>
            <div className="relative left-4">
                <Link href={slug}>
                    <div className='bg-white flex justify-center hover:animate-bounce hover:cursor-pointer items-center'>
                        <Image className="w-full h-[150px] md:h-[200px] object-center object-cover relative rounded-tr-[40px] rounded-bl-[40px]" height={150} width={200} src={url} alt="" />
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}

export default index;