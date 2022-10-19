import Image from "next/image";
import { useRouter, Router } from "next/router";
import Link from "next/link";
const Index = ({ title, url, slug }) => {
    const router = useRouter();
    const { query } = router;
    const { year } = query;
    const link = `/${year}/${slug}`;
    var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return (
        <Link href={link} passHref>
            <div>
                <div className="cursor-pointer max-w-xs h-64 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mx-2 mb-6 py-5 px-4">
                    <div>
                        <h4 className="text-gray-800  font-bold mb-3">{title}</h4>
                        <Image src={url} width={200} height={150} />
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-gray-800">
                            <p className="text-sm ">{date}</p>
                            <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                                <img src="https://s2.svgbox.net/loaders.svg?ic=hearts&color=fff" width="22" height="22" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
};
export default Index;
