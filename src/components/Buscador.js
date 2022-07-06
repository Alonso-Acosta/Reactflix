import swalert from '@sweetalert/with-react';
import {useNavigate} from 'react-router-dom';

function Buscador(){
    const navigate = useNavigate();
    const submitHandler = e =>{
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        if(keyword.length === 0){
            swalert(
                <h2>Tienes que escribir un palabra clave.</h2>
            )
        }else if(keyword.length < 3){
            swalert(
                <h2>Tienes que escribir más de 3 caracteres</h2>
            )
        }else{
            e.currentTarget.keyword.value = '';
            navigate(`/resultado?keyword=${keyword}`);
        }
    }

    return(
        <>
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
        <label className='form-label mb-0 mx-2'>
            <input className='form-control' type="text" name="keyword" placeholder="Buscardor"/>
        </label>
        <button className='btn btn-primary' type="submit">Buscar</button>
    </form>
        </>
    )
}
export default Buscador;