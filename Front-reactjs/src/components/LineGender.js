import React from 'react';
import { Link } from 'react-router-dom';
import './styles/lineStyles.css';

const LineGender = ({ id, name, image, remove , cookies}) =>(
 
    <tr className="renglonLine ">
        <td className="text-center">{id}</td>
        <td className="" >{name}</td>
        <td className="imagenGender centrar" ><img src={'http://localhost:3000/assets/genders/'+image}   alt="Genero" /> </td>
        
        <td className="centrar renglonList ">
            <div className={getRoleView(cookies)}>
                <Link to={`/genders/edit/${id}`} className=" btn btn-primary btn-sm mr-2 me-md-3"
                        role="button" aria-pressed="true"> Editar </Link>

                <button type="button" className=" btn btn-danger btn-sm btn-sm mr-2 me-md-1" 
                        onClick= {() =>{remove(id); }} >Eliminar </button>
            </div>
        </td>      
    </tr>
    
);
//hacer visibles opciones para administrador
const getRoleView=(cookies)=> { 
    if(cookies.cookies.role === "ADMIN") {
    return 'visible'
    } else {
    return 'invisible'
    }
};
        

export default LineGender;