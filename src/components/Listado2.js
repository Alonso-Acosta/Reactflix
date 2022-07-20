import {Navigate,Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import swalert from '@sweetalert/with-react';
import axios from 'axios';

function Listado2(props){
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
        <h4>Ultimos Estrenos:</h4>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className='carousel-inner mx-5'>
                <div className="carousel-item active">
                    {moviesList.slice(0,5).map((oneMovie,idx)=>{
                    return( 
                        <div className='cardd d-inline'>
                            <Link to={`/detalle?movieID=${oneMovie.id}`} key={idx} className=""><img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top imgListado" alt="..." />
                            </Link>
                        </div>
                        )
                        })
                    }
                </div>
                <div className="carousel-item ">
                    {moviesList.slice(5,10).map((oneMovie,idx)=>{
                    return( 
                        <div className='cardd d-inline'>
                            <Link to={`/detalle?movieID=${oneMovie.id}`} className=""><img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top imgListado" alt="..." /></Link>
                        </div>
                        )
                        })
                    }
                </div>
                <div className="carousel-item ">
                    {moviesList.slice(10,15).map((oneMovie,idx)=>{
                    return( 
                        <div className='cardd d-inline'>
                            <Link to={`/detalle?movieID=${oneMovie.id}`} className=""><img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top imgListado" alt="..." /></Link>
                        </div>
                        )
                        })
                    }
                </div>
                <div className="carousel-item ">
                    {moviesList.slice(15,20).map((oneMovie,idx)=>{
                    return( 
                        <div className='cardd d-inline'>
                            <Link to={`/detalle?movieID=${oneMovie.id}`} className=""><img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top imgListado" alt="..." /></Link>
                        </div>
                        )
                        })
                    }
                </div>
            </div>
    <button className="carousel-control-prev ControlCa" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next ControlCa" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
        </div>
        </>
    )
}

export default Listado2;