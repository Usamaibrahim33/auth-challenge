// import { create } from "domain";
import { useEffect, useState } from "react";
import MovieList from "./MovieCreated";
import MoviePage from "./CreateMovie";


function CreateMovie() {
    return (
        <div className=" md:flex justify-around">
            <div>
                <MoviePage />
            </div>

            <div>
                <MovieList />
            </div>
        </div>
    );
}





export default CreateMovie;