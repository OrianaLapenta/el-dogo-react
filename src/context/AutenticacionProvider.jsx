import { useState } from "react";
import api from "../api/axios";
import { VeterinariaContext } from"./VeterinariaContext";

export const AutenticacionProvider = ({ children }) =>{
    const [ usuarioActual, setUsuarioActual ] = useState(() => {
        const tokenGuardado = localStorage.getItem('tokenAcceso');
        const UsuarioGuardado = localStorage.getItem('datosUsuario')

        if( tokenGuardado && UsuarioGuardado) {
            try {
                return JSON.parse(UsuarioGuardado);
            } catch (error) {
                console.error('Error al parsear los datos del usuario:', error);
                return null;
            }
        }
        return null;
    });

    const IniciarSesion = async (correoElectronico, contraseña) => {
        try{
            const Respuesta = await api.post('/autenticacion/login', {
                correoElectronico,
                contraseña
            });

            const { tokenAcceso, usuario } = Respuesta.data;

            localStorage.setItem('tokenAcceso', tokenAcceso);
            localStorage.setItem('datosUsuario', JSON.stringify(usuario));

            setUsuarioActual(usuario);

            return {exito: true };
        } catch (error) {
            const mensajeError = error.response?.date?.mensaje || 'Error al iniciar la sesion';
            return {exito: false, mensaje: mensajeError };
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem('tokenAcceso');
        localStorage.removeItem('datosUsuario');

        setUsuarioActual(null);
    };

    const valoresContexto = {
        usuarioActual,
        IniciarSesion,
        cerrarSesion
    };

    return(
        <VeterinariaContext.Provider value={ valoresContexto }>
            {children}
        </VeterinariaContext.Provider>
    )

    
}
