import { useAutenticacion } from '../hooks/useAutenticacion'

function Login ({ onLoginExitoso }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [cargando, Setcargando] = useState(false);
    const[mensajeError, setMensajeError] = useState(''); 

    const { iniciarSecion } = useAutentication();
    const navegar = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setCargando(true);
    const resultado = await iniciarSecion(email, password);

    setCargando(false);

    if (resultado.exito) {
        navegar('/clientes');
    } else {
        setMensajeError(resultado.mensaje);
        setPassword('');
    }
};

return (
    <div className="w-full max-w-mb bg-white dark:bg-slate-800 rounded-2x1 shadow-x1 overflow-hidden border border-slate-100 dark:border-slate-700">
        <div className="px-8 py-10">
            <div className="text-center mb-10">
                <div className="mx-auto- h-16 w-16 bg-indigo-100 dark:bg-indigo-900/300 rounded-full flex items-center justify-center mb-4 text-3x1 shadow-sm">
                </div>
                <h2 className="text-2x1 font-bold text-slate-800 dark:text-white">Bienvenido a El Dogo</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Ingresa tu correo y clave de acceso para continuar.</p>
            </div>

            {mensajeError &&(
                <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-leg text-center">
                    {mensajeError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                        Correo Eléctronico
                    </label>
                    <input
                    id="email"
                    type="email"
                    placheholder="admin@eldogo.com"
                    value={email}
                    onChange={ (e) => setEmail(e.terget.value) }
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-900 dark:text-white placheholder-slate-400" required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium tex-slate-700 dark:text-slate-200 mb-2">
                        Contraseña
                    </label>
                    <input
                    id="password"
                    type="password"
                    placheholder="........"
                    value={password}
                    onChange={(e) => setPassword(e.terget.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-salte-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 text-slate-900 dark:text-white placheholder-slate-400"
                    required 
                    />
                </div>
                <button
                type="submit"
                disabled={cargando}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400-tex-white font-semibold rounded-lg shadow-mb hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    {cargando ? 'Verificando...' : 'Ingresar'}
                </button>
            </form>
        </div>
        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 text-center">
        <p className="text-xs text-slate-500">¿Olvidaste tu contraseña? Contacta al administrador.</p>
        </div>
    </div>
);
}

export default Login;

