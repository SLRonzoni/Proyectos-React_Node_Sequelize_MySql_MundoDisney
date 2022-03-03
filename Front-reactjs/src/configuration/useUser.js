import { useCallback,useContext } from "react";
import Context from "./UserContext";

import loginServices from "../services/SACARlogin";


export default function useUser(email,clave){

    const {jwt,setJwt} = useContext(Context)

    const login = useCallback((email,clave) => {
      loginServices({email,clave})
      .then(token =>{
          setJwt(token)
      })
      .catch(error => {
          console.log(error)
      })
    },[setJwt])

    const logout = useCallback(() => {
        setJwt(null)
    },[setJwt])

    return {
        isLogged:Boolean(jwt),
        login,
        logout
    }


}