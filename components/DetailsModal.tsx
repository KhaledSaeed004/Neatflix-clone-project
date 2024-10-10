import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useDetailsModal from "@/hooks/useDetailsModal";
import useMovie from "@/hooks/useMovie";
import Loader from "./Loader";

interface DetailsModalProps {
    visible?: boolean;
    onClose: () => void;
}

function DetailsModal({ visible, onClose }: DetailsModalProps) {
    const [isVisible, setIsVisible] = useState(!!visible);

    const { movieId } = useDetailsModal();
    const { data = {}, isLoading } = useMovie(movieId);

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div
            className={`flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 transition duration-300 bg-black ${
                isVisible ? "bg-opacity-80" : "bg-opacity-0"
            }`}
        >
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div
                    className={`relative flex-auto bg-zinc-900 drop-shadow-md ${
                        isVisible ? "scale-100" : "scale-0"
                    } transform transition duration-300`}
                >
                    {isLoading ? (
                        <div className="relative px-80 py-60 flex items-center justify-center">
                            <Loader alt />
                        </div>
                    ) : (
                        <>
                            <div className="relative h-96">
                                <video
                                    className="size-full brightness-[60%] object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    poster={data?.thumbnailUrl}
                                    src={data?.videoUrl}
                                ></video>
                                <button
                                    className="absolute flex items-center justify-center top-4 right-4 size-10 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                    onClick={handleClose}
                                >
                                    <AiOutlineClose size={20} />
                                </button>
                                <div className="absolute bottom-[10%] left-10">
                                    <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                        {data?.title}
                                    </p>
                                    <div className="flex flex-row gap-4 items-center">
                                        <PlayButton movieId={data?.id} />
                                        <FavoriteButton movieId={data?.id} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-12 pt-8">
                                <p className="text-green-400 font-semibold text-lg">
                                    New <span className="text-white">2024</span>
                                </p>
                                <div className="flex flex-row mt-4 gap-2 items-center">
                                    <p className="text-white text-[10px] lg:text-sm capitalize">
                                        {data?.duration}
                                    </p>
                                    <span className="text-[#7e7e7e] cursor-default">
                                        |
                                    </span>
                                    <p className="text-white text-[10px] lg:text-sm bg-zinc-700 rounded-md px-2 py-1 font-semibold cursor-default">
                                        {data?.genre}
                                    </p>
                                </div>
                            </div>
                            <div className="px-12 pt-4 pb-8">
                                <p className="text-[#ccc] text-lg">
                                    {data?.description}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetailsModal;
