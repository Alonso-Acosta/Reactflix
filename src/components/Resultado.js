import {useEffect, useState} from 'react';
import swalert from '@sweetalert/with-react';
import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
function Resultado(){
    let token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let idmovie = query.get('keyword');

    const [moviesResults, setMoviesResults] = useState([]);
    useEffect(()=>{
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=b507dc73409f8e879464dad485147780&language=es-ES&query=${idmovie}`
        axios.get(endPoint)
            .then(response =>{
                const apiData=response.data.results;
                if(apiData.length ===0){
                    swalert(
                        <h2>Tu busqueda no arroja resutaldo.</h2>
                    )
                }
                setMoviesResults(apiData);
            })
            .catch(error =>{
                swalert(
                    <h2>Presentamos un Error, Intenta mas tarde.</h2>
                )
            })
    },[idmovie]);
    return(
        <>
        { !token && <Navigate to='/' replace={true} />}
        <h2>Resultado: {idmovie}</h2>
        <div className='row'>
        {
            moviesResults.map((oneMovie,idx)=>{
                return(
                    <div className='col-4' key={idx}>
                        <div className="card" >
                            <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
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
export default Resultado;