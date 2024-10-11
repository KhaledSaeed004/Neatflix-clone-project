import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import dynamic from "next/dynamic";

// Load Vidstack components only on the client side
const MediaPlayer = dynamic(
    () => import("@vidstack/react").then((mod) => mod.MediaPlayer),
    {
        ssr: false,
    }
);
const MediaProvider = dynamic(
    () => import("@vidstack/react").then((mod) => mod.MediaProvider),
    {
        ssr: false,
    }
);
const DefaultVideoLayout = dynamic(
    () =>
        import("@vidstack/react/player/layouts/default").then(
            (mod) => mod.DefaultVideoLayout
        ),
    { ssr: false }
);
import { defaultLayoutIcons } from "@vidstack/react/player/layouts/default";

// Import Vidstack styles (safe to keep outside dynamic as styles don't affect SSR)
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

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
            {data?.videoUrl && (
                <MediaPlayer title={data?.title} src={data?.videoUrl} autoPlay>
                    <MediaProvider />
                    <DefaultVideoLayout
                        thumbnails={data?.thumbnailUrl}
                        icons={defaultLayoutIcons}
                    />
                </MediaPlayer>
            )}
        </div>
    );
}

export default Watch;
