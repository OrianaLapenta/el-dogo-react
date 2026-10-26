
/* Componentes */
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticación} from './context/AutenticacionContexto';
import Login from './components/Login';
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import VistaDetalleCliente from './components/VistaDetalleCliente';
import { VeterinariaProvider } from './context/VeterinariaProvider';
import { RutaProtegida } from './context/VeterinariaProvider';

import Navegación from './components/Navegación'
import VistaClientes from './components/VistaClientes';
import VistaDetalleCliente from './components/VistaDetalleCliente';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import Login from './components/Login'; 


function VeterinariaApp() {
  return (
  <ProveedorAutenticacion>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Routes>
        <Route
          path="/login"
          element={
            <main className="min-h-screen flex items-center justify-center p-4">
            <Login />
            </main>
          }
        />

        <Route element= {<RutaProtegida/>}>
          <Route
            path="/*"
            element={
            <VeterinariaProvider>
              <header className= "stick top-0 z-50 w-full bckrop-blur-lg bg-white/70 border-b border-slate-200 dark:bg-slate-950/70 dark:border-slate-800">
                <Navegacion />
              </header>
              <main className="container mx.auto px-4 py-8 max-w-7.1">
                <Routes>
                  <Route path="/" element={<Navigate to="/clientes" replace />} />
                  <Route path="/clientes" element={<VistaClientes />} />
                  <Route path="/cliente/:id" element={<VistaDetalleCliente />} />
                  <Route path="/mascotas/:id" element={<VistaMascotas />} />
                  <Route path="config" element={<VistaConfiguración />} /> 
                  <Route
                  path="*"
                  element={
                    <div className="text-center py-20">
                      <h2 className="text-3.1 font-bold text-slate-700 dark:text-slate-200">
                        404 | Página no encontrada
                      </h2>
                    </div>
                  }
                  />
                </Routes>
              </main>
            </VeterinariaProvider>
          }
          />
          </Route>

        </Routes>
      </div>
    </ProveedorAutenticacion>
  );
}
export default App;