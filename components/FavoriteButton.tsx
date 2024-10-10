import React, { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loader from "./Loader";
import { getCsrfToken } from "next-auth/react";
import useScreenSize from "@/hooks/useScreenSize";

interface FavoriteButtonProps {
    movieId: string;
}

// fix on md screen or smaller.. icon is way too big

function FavoriteButton({ movieId }: FavoriteButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const screenSize = useScreenSize();

    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const userFavoritesList = currentUser?.favoriteIds || [];

        return userFavoritesList.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorite = useCallback(async () => {
        try {
            setIsLoading(true);

            let response;
            const csrfToken = await getCsrfToken();

            if (isFavorite) {
                response = await axios.delete("/api/favorite", {
                    data: { movieId, csrfToken },
                });
            } else {
                response = await axios.post("/api/favorite", {
                    movieId,
                    csrfToken,
                });
            }

            const updatedFavoriteIds = response?.data?.favoriteIds;

            mutate({
                ...currentUser,
                favoriteIds: updatedFavoriteIds,
            });

            mutateFavorites();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    const FavoriteIcon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <button
            className="group/item size-6 lg:size-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300"
            onClick={toggleFavorite}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader size={screenSize === "xl" ? 20 : 10} />
            ) : (
                <FavoriteIcon
                    className="text-white"
                    size={screenSize === "xl" ? 25 : 15}
                />
            )}
        </button>
    );
}

export default FavoriteButton;
