import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../App.css'

function Detail(){
    const[loading, setLoading] = useState(true);
    const[movie, setMovie] = useState([]);
    const { id } = useParams();
    console.log(id);

    const getDetailMovie = async() => {
        const fatchUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
        const json = await (
            await fetch(fatchUrl)
        ).json();
        console.log(json.data.movie);
        setMovie(json.data.movie);
        setLoading(false);
    };

    useEffect(() => {
        getDetailMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {loading ? (<h1>Loading...</h1>
            ) : (
            <div>
                <table width="600px">
                    <tr><p><img src={movie.large_cover_image} alt={movie.title}/></p></tr>
                    <tr><p><b>Title : {movie.title}</b></p></tr>
                    <tr><p>{movie.description_full}</p></tr>
                    <tr><p>Update : {movie.date_uploaded}</p></tr>
                    <tr>
                        <ul>
                            {movie.genres.map(g => <li key={g}>{g}</li>)}
                        </ul>
                    </tr>                    
                </table>
            </div>
            )}
    </div>
    );
}

export default Detail;