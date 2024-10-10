import React from "react";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
    label: string;
    data: Record<string, any>[];
}

function MovieList({ label, data }: MovieListProps) {
    if (isEmpty(data)) return null;

    return (
        <div className="px-4 md:px-12 mt-12 space-y-8">
            <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
                {label}
            </h2>
            <div className="grid grid-cols-4 gap-2">
                {data.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
