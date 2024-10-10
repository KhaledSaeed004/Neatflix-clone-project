import Billboard from "@/components/Billboard";
import DetailsModal from "@/components/DetailsModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useDetailsModal from "@/hooks/useDetailsModal";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default function Home() {
    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavorites();
    const { isOpen, closeModal } = useDetailsModal();

    return (
        <>
            <DetailsModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <Billboard />
            <div className="pb-48">
                <MovieList label="Trending Now" data={movies} />
                <MovieList label="Favorites" data={favorites} />
            </div>
        </>
    );
}
