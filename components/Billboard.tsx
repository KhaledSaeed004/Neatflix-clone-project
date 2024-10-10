/* eslint-disable @next/next/no-img-element */
import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Loader from "./Loader";
import PlayButton from "./PlayButton";
import { useCallback } from "react";
import useDetailsModal from "@/hooks/useDetailsModal";

function Billboard() {
    const { data, error, isLoading } = useBillboard();
    const { openModal } = useDetailsModal();

    const handleOpenDetailsModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    if (isLoading)
        return (
            <div className="relative h-[56.25vw] flex items-center justify-center">
                <Loader alt />
            </div>
        );

    if (error) return <div>Error: {error.message}</div>;

    if (!data) return <div>No movie data available</div>;

    const { id, title, description, thumbnailUrl, videoUrl } = data;

    return (
        <div className="relative h-[56.25vw]">
            <video
                autoPlay
                muted
                loop
                poster={thumbnailUrl}
                src={videoUrl}
                className="w-full h-[56.25vw] object-cover brightness-[60%]"
            ></video>
            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-xl md:text-5xl h-full w-full lg:text-6xl font-bold drop-shadow-xl">
                    {title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-2 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={id} />
                    <button
                        onClick={handleOpenDetailsModal}
                        className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
                    >
                        <AiOutlineInfoCircle className="mr-1 md:mr-2" />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Billboard;

// const BillboardVideo = ({
//     id,
//     title,
//     backdrop_path,
// }: {
//     id: number;
//     title: string;
//     backdrop_path: string;
// }) => {
//     const { videoKey } = useTrailer(id);

//     const backdrop = `https://image.tmdb.org/t/p/original${backdrop_path}`;

//     const [isLoaded, setIsLoaded] = useState(false);

//     const handleIframeVideoLoad = () => {
//         setIsLoaded(true);
//     };

//     return (
//         <div>
//             {!isLoaded && (
//                 <img
//                     src={backdrop}
//                     alt={`${title} poster`}
//                     className="absolute top-0 left-0 w-full h-[56.25vw] object-cover brightness-[60%]"
//                 />
//             )}
//             <iframe
//                 id="video-iframe"
//                 src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&playsinline=1&playlist=${videoKey}`}
//                 allow="encrypted-media"
//                 onLoad={handleIframeVideoLoad}
//                 className="w-full h-[56.25vw] object-cover brightness-[60%] pointer-events-none"
//             ></iframe>
//         </div>
//     );
// };
