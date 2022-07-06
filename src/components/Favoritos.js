
import {Link} from 'react-router-dom';


function Favoritos(props){
    
    return(
        <>
        <h2>Sus Favoritos:</h2>
        <div className='row'>
        {
            props.favorites.map((oneMovie,idx)=>{
                return(
                    <div className='col-3' key={idx}>
                        <div className="card" >
                            <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
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
export default Favoritos;