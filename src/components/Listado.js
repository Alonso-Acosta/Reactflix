import {Navigate,Link } from 'react-router-dom';
import {useEffect, useState} from 'react';

import swalert from '@sweetalert/with-react';
import axios from 'axios';

function Listado(props){
    //Version 1 de redireccion
    //const navigate = useNavigate();
    // useEffect(()=>{
    //     const token = localStorage.getItem('token');
    //     if(token === null){
    //         navigate('/')
    //     }
    // })
    //Version mejorada del redireccion
    let token = sessionStorage.getItem('token');
    // sessionStorage para sesiones temporales 
    const [moviesList, setMoviesList] = useState([]);
    useEffect(()=>{
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=b507dc73409f8e879464dad485147780&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
        axios.get(endPoint)
            .then(response =>{
                const apiData=response.data.results;
                setMoviesList(apiData);
            
            })
            .catch(error =>{
                swalert(
                    <h2>Presentamos un Error, Intenta mas tarde.</h2>
                )
            })
    },[setMoviesList]);
    return(
        <>
        { !token && <Navigate to='/' replace={true} />}
        <div className='row'>
        {
            moviesList.map((oneMovie,idx)=>{
                return(
                    <div className='col-3' key={idx}>
                        <div className="card" >
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                            <button className='favourite-btn'
                                    onClick={props.addOrRemoveFavs}
                                    data-movie-id={oneMovie.id}
                            >🖤</button>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title}</h5>
                                <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                                <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Detalles</Link>
                            </div>
                        </div>
                    </div>
                
                )
            })
        }
        </div>
        </>
    )
}

export default Listado;