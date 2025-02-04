import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import Loading from './Loading.json'
export default function Loader(){
    return(
        <>
        <div className="w-full h-full flex flex-col justify-center items-center">
        <Lottie  className='size-24' animationData={Loading}/>
        </div>
        </>
    )
}