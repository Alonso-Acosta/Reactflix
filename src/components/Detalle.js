import axios from "axios";
import {Navigate } from 'react-router-dom';
import { useEffect,useState } from "react";

function Detalle(){
    let token = sessionStorage.getItem('token');
    //  para sesiones temporales 
    let query = new URLSearchParams(window.location.search);
    let idmovie = query.get('movieID');
    const [movieDate, setMovieDate] = useState(null);
    const endPointPeli = `https://api.themoviedb.org/3/movie/${idmovie}?api_key=b507dc73409f8e879464dad485147780&language=es-ES`;
    useEffect(()=>{
        axios.get(endPointPeli)
            .then(res =>{
                const apiData=res.data;
                setMovieDate(apiData);
                console.log(res);
            })
            .catch(error =>{
                console.log(error)
            })

    })
    return(
        <>
        { !token && <Navigate to='/' replace={true} />}
        {!movieDate && <h1>Cargando</h1>}
        {movieDate &&
            <>
            <h5>Titulo: {movieDate.title}</h5>
            <div className="row">
                <div className="col-3">
                <img src={`https://image.tmdb.org/t/p/w500/${movieDate.poster_path}`} className="img-fluid" alt="movie-poster" />
                </div>
                <div className="col-8">
                    <h5>Fecha de estreno: {movieDate.release_date}</h5>
                    <h5>Sinopsis :</h5>
                    <p>{movieDate.overview}</p>
                    <h5>Calificacion: {movieDate.vote_average}</h5>
                    <h5>Generos: </h5>
                    <ul>
                        {movieDate.genres.map(oneG => <li key={oneG.id}>{oneG.name}</li>)}
                    </ul>
                </div>
            </div>
            </>
        }
        </>
    )
}
export default Detalle;