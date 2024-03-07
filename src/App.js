import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Inicio from './components/Inicio/Inicio';
import ListaClientes from './components/ListaClientes/ListaClientes';
import Sobre from './components/Sobre/Sobre';
import './styles/Style.css';

function App() {
  const [currentPage, setCurrentPage] = useState('inicio');

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <Inicio />;
      case 'listar-clientes':
        return <ListaClientes />;
      case 'sobre':
        return <Sobre />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="flex flex-col h-screen text-center">
      <ToastContainer /> {/* ToastContainer para exibir mensagem de sucesso ou erro */}
      <header className="bg-gray-300 backdrop-blur-sm shadow-2xl">
        <nav className="m-2 bg-gray-300 space-x-8">
          <button
            className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
            onClick={() => setCurrentPage('inicio')}
          >
            Início
          </button>
          <button
            className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
            onClick={() => setCurrentPage('listar-clientes')}
          >
            Listar Clientes
          </button>
          <button
            className="bg-gray-300 text-black hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
            onClick={() => setCurrentPage('sobre')}
          >
            Sobre
          </button>
        </nav>
      </header>
      <hr className="border-slate-300" />
      <main className="bg-white h-screen mt-12">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
