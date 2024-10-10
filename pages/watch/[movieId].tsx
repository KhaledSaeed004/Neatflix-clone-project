import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

function Watch() {
    const router = useRouter();
    const { movieId } = router.query;

    const { data } = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-gradient-to-b from-black to-transparent">
                <button onClick={() => router.push("/")}>
                    <HiOutlineArrowLeft className="text-white" size={40} />
                </button>
                <p className="text-white text-xl md:text-3xl font-bold">
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>
            <MediaPlayer title={data?.title} src={data?.videoUrl} autoPlay>
                <MediaProvider />
                <DefaultVideoLayout
                    thumbnails={data?.thumbnailUrl}
                    icons={defaultLayoutIcons}
                />
            </MediaPlayer>
        </div>
    );
}

export default Watch;
