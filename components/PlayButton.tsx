import useDetailsModal from "@/hooks/useDetailsModal";
import { useRouter } from "next/router";
import React from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
    movieId: string;
}

function PlayButton({ movieId }: PlayButtonProps) {
    const router = useRouter();
    const { closeModal } = useDetailsModal();

    const handlePlayMovie = () => {
        router.push(`/watch/${movieId}`);
        closeModal();
    };

    return (
        <button
            onClick={handlePlayMovie}
            className="flex items-center bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold hover:bg-neutral-300 transition"
        >
            <BsFillPlayFill size={25} className="mr-1" />
            <span className="pr-1">Play</span>
        </button>
    );
}

export default PlayButton;
