import axios from 'axios';
import swalert from '@sweetalert/with-react';
import { useNavigate,Navigate } from 'react-router-dom';
//Styles
import '../Style/bootstrap.min.css';

function Login(){
    const navigate = useNavigate();
    const submitHandler = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // eslint-disable-next-line
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email === '' || password === ''){
            swalert(<h2>
                Los Campos no deben estar vacios!!!
            </h2>)
            
            return;
        }
        if(email !== '' && !regexEmail.test(email)){
            swalert(<h2>
                Debes escribir un email valido
            </h2>)
            
            return
        }

        if(email !== 'challenge@alkemy.org' || password !=='react'){
            swalert(<h2>
                Credenciales invalidas
            </h2>)
            return
        }

        console.log('Ok');    
        axios
            .post('http://challenge-react.alkemy.org',{email,password})
            .then(res => {
                swalert(<h2>
                    Ingresaste
                </h2>)
                const tokenR = res.data.token;
                sessionStorage.setItem('token',tokenR);
                navigate('/listado')
            })
    }
    let token = sessionStorage.getItem('token');
    //  para sesiones temporales 
return(
    
    <div className='d-flex justify-content-center'>
    { token && <Navigate to='/listado' replace={true} />}
    <form onSubmit={submitHandler}>
        <div><h2>Login :</h2></div>
        <label className='form-label'>
            Correo Electronico:
            <input className='form-control' type="text" name="email"/>
        </label>
        <br />
        <label className='form-label'>
            Contraseña:
            <input className='form-control' type="password" name="password"/>
        </label>
        <br />
        <button className='btn btn-primary' type="submit">Ingresar</button>
    </form>
    </div>
)
}

export default Login;