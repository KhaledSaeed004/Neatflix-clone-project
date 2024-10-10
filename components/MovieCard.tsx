import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { BiChevronDown } from "react-icons/bi";
import useDetailsModal from "@/hooks/useDetailsModal";

interface MovieCardProps {
    movie: Record<string, any>;
}

function MovieCard({ movie }: MovieCardProps) {
    const router = useRouter();
    const { openModal } = useDetailsModal();

    return (
        <div className="group bg-zinc-900 col-span-1 relative h-[12vw]">
            <img
                src={movie.thumbnailUrl}
                alt={`${movie.title} thumbnail`}
                className="cursor-pointer object-cover shadow-xl rounded-md z-0 transition duration-200 group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
            />
            <div className="absolute top-0 opacity-0 z-10 transition duration-200 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <img
                    src={movie.thumbnailUrl}
                    alt={`${movie.title} thumbnail`}
                    className="cursor-pointer object-cover shadow-xl rounded-t-md w-full h-[12vw] transition duration-200"
                />
                <div className="absolute bg-zinc-800 w-full p-2 lg:p-4 shadow-md rounded-b-md z-10">
                    <div className="flex flex-row items-center gap-3">
                        <button
                            className="cursor-pointer size-6 lg:size-10 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
                            onClick={() => {
                                router.push(`/watch/${movie?.id}`);
                            }}
                        >
                            <BsFillPlayFill size={30} />
                        </button>
                        <FavoriteButton movieId={movie?.id} />
                        <button
                            onClick={() => openModal(movie?.id)}
                            className="flex items-center justify-center ml-auto group/item size-10 lg:size-10 border-white border-2 rounded-full hover:border-neutral-300 transition"
                        >
                            <BiChevronDown
                                size={30}
                                className="text-white group-hover/item:text-neutral-300"
                            />
                        </button>
                    </div>

                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2024</span>
                    </p>

                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm capitalize">
                            {movie.duration}
                        </p>
                        <span className="text-[#7e7e7e] cursor-default">|</span>
                        <p className="text-white text-[10px] lg:text-sm bg-zinc-700 rounded-md px-2 py-1 font-semibold cursor-default">
                            {movie.genre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
