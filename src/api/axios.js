import axios from "axios";

const api =  axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

//Interceptor
api.interceptors.request.use(
    (configuracion) => {
        const tokenGuardado = localStorage.getItem('tokenAcceso');
        if(tokenGuardado) {
            configuracion.headers.Authorization = 'Bear ${tokenGuardado}';
        }
        return configuracion;
    },
    (error) => Promise.reject(error)
);

export default api;