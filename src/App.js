import { useState, useEffect } from "react";
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import {Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultado from './components/Resultado';
import Favoritos from './components/Favoritos';

//Styles
import './Style/bootstrap.min.css';
import './Style/App.css';


function App() {
  const [favorites , setFavorites] = useState([]);
  useEffect(()=>{
      const favsInLocal = localStorage.getItem('favs');
      if(favsInLocal != null){
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
      }
  },[])


  
  const addOrRemoveFavs = e =>{
    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;
    if(favMovies === null){
      tempMoviesInFavs = [];
    }else{
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;//Captura el elemento padre
    const imgURL = parent.querySelector('img').getAttribute('src'); 
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const id = btn.dataset.movieId; //Traemos de los data, el id
    const movieData ={
      imgURL,title,overview, id};
      let movieIsInArray = tempMoviesInFavs.find(oneMovie =>{
        return oneMovie.id===movieData.id;
      })
      if(!movieIsInArray){
        tempMoviesInFavs.push(movieData);
        localStorage.setItem('favs',JSON.stringify(tempMoviesInFavs)); 
        setFavorites(tempMoviesInFavs); 
      }else{
        let movieLeft = tempMoviesInFavs.filter(oneMovie =>{
          return oneMovie.id !== movieData.id;
        })
        localStorage.setItem('favs',JSON.stringify(movieLeft));
        setFavorites(movieLeft);   
      }
      
    }


  return (
    <>
      <Header favorites={favorites} />
      <div className='container'>

      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/listado' element={<Listado addOrRemoveFavs={addOrRemoveFavs}/> } />
        <Route path='/detalle' element={<Detalle />} />
        <Route path='/resultado' element={<Resultado />} />
        <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFavs={addOrRemoveFavs} />} />
      </Routes>
      </div>
      <Footer />
    </>
    
  );
}

export default App;
