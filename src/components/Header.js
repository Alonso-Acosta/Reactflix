//Componentes
import Buscador from './Buscador';
// Librerias
import {Link} from 'react-router-dom';

function Header(props){
    return(
        // eslint-disable-next-line
        <header>
        
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark py-0" id='header'>
            
                <div className="container-fluid">
                    <a className="navbar-brand ms-5" id='REACTFLIX'>REACTFLIX</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link active' to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link active' to='/listado'>Listado</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link active' to='/favoritos'>Favoritos: {props.favorites.length}</Link> 
                        
                        </li>
                    </ul>
                    </div>
                    <Buscador />
                </div>
            </nav>
        </header>
    )    
}

export default Header;