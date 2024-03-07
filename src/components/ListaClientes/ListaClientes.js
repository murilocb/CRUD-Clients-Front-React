import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify'; // Importando o toast
import 'react-toastify/dist/ReactToastify.css'; // Importando estilos do toast
import AdicionarClienteModal from '../AdicionarCliente/AdicionarClienteModal';
import EditarClienteModal from '../EditarClienteModal/EditarClienteModal';
import Mapa from '../Mapa/Mapa';

const ListaClientes = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEmail, setFiltroEmail] = useState('');
  const [filtroTelefone, setFiltroTelefone] = useState('');
  const [filtroData, setFiltroData] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [isAdicionarClienteModalOpen, setIsAdicionarClienteModalOpen] = useState(false);
  const [isEditarClienteModalOpen, setIsEditarClienteModalOpen] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/clientes`, {
          params: {
            lat: 0.0,
            lon: 0.0
          }
        });
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        toast.error('Erro ao buscar clientes'); // Exibir mensagem de erro
      }
    };

    fetchData();
  }, []);

  // Função para exibir mensagem de sucesso
  const showSuccessMessage = (message) => {
    toast.success(message);
  };

  // Função para exibir mensagem de erro
  const showErrorMessage = (message) => {
    toast.error(message);
  };

  const handleFiltroNomeChange = (event) => {
    setFiltroNome(event.target.value);
  };

  const handleFiltroEmailChange = (event) => {
    setFiltroEmail(event.target.value);
  };

  const handleFiltroTelefoneChange = (event) => {
    setFiltroTelefone(event.target.value);
  };

  const handleFiltroDataChange = (event) => {
    setFiltroData(event.target.value);
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
    cliente.email.toLowerCase().includes(filtroEmail.toLowerCase()) &&
    cliente.telefone.toLowerCase().includes(filtroTelefone.toLowerCase()) &&
    cliente.created_at.toLowerCase().includes(filtroData.toLowerCase())
  );

  // Função para mostrar ou esconder os filtros
  const handleMostrarFiltros = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  // Função para abrir o modal de adicionar cliente
  const handleOpenAdicionarClienteModal = () => {
    setIsAdicionarClienteModalOpen(true);
  };

  // Função para fechar o modal de adicionar cliente
  const handleCloseAdicionarClienteModal = () => {
    setIsAdicionarClienteModalOpen(false);
  };

  // Função para lidar com o clique no botão de visualização de rota
  const handleVisualizarRota = (cliente) => {
    setClienteSelecionado(cliente); // Define o cliente selecionado
  };

  // Função para fechar o modal de visualização de rota
  const handleCloseModal = () => {
    setClienteSelecionado(null);
  };

  const handleOpenEditarClienteModal = (cliente) => {
    setClienteEditado(cliente);
    setIsEditarClienteModalOpen(true);
  };

  const handleCloseEditarClienteModal = () => {
    setIsEditarClienteModalOpen(false);
  };


  // Função para formatar a distância
  const formatarDistancia = (distancia) => {
    return distancia.toFixed(2) + ' km';
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-xl font-bold mb-4">Lista de Clientes</h1>
      <div className="flex justify-center mb-4 space-x-52">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleMostrarFiltros}
        >
          {mostrarFiltros ? 'Esconder Filtros' : 'Mostrar Filtros'}
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleOpenAdicionarClienteModal}
        >
          Adicionar Cliente
        </button>
      </div>
      {mostrarFiltros && (
        <div className="p-4 rounded md:w-1/2 mx-auto">
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-4">
              <label htmlFor="filtroNome" className="block font-medium text-gray-700">Filtrar por Nome</label>
              <input
                type="text"
                id="filtroNome"
                value={filtroNome}
                onChange={handleFiltroNomeChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder='Nome'
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label htmlFor="filtroEmail" className="block font-medium text-gray-700">Filtrar por Email</label>
              <input
                type="text"
                id="filtroEmail"
                value={filtroEmail}
                onChange={handleFiltroEmailChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder='exemplo@exemplo.com'
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label htmlFor="filtroTelefone" className="block font-medium text-gray-700">Filtrar por Telefone</label>
              <input
                type="text"
                id="filtroTelefone"
                value={filtroTelefone}
                onChange={handleFiltroTelefoneChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder='(99) 99999-9999'
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label htmlFor="filtroData" className="block font-medium text-gray-700">Filtrar por Data</label>
              <input
                type="text"
                id="filtroData"
                value={filtroData}
                onChange={handleFiltroDataChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder='DD/MM/YYYY'
              />
            </div>
          </div>
        </div>
      )}
      <table className="min-w-max divide-y divide-gray-200 table-auto mx-auto w-3/4 mb-20 shadow-2xl">
        <thead className="bg-gray-50 shadow-2xl">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ordem</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Coordenada X</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Coordenada Y</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Distancia Do Seu Ponto</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredClientes.map((cliente, index) => (
            <tr key={cliente.id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}>
              <td className="px-6 py-4 whitespace-nowrap text-center">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.telefone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.created_at}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.coordenada_x}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{cliente.coordenada_y}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{formatarDistancia(cliente.distancia_km)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleVisualizarRota(cliente)}
                >
                  <FontAwesomeIcon icon={faMap} className="mr-2" />
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleOpenEditarClienteModal(cliente)}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdicionarClienteModal
        isOpen={isAdicionarClienteModalOpen}
        onClose={handleCloseAdicionarClienteModal}
        clientes={clientes}
        setClientes={setClientes}
        showSuccessMessage={showSuccessMessage} // Passando função de sucesso para o modal
        showErrorMessage={showErrorMessage} // Passando função de erro para o modal
      />
      <EditarClienteModal
        isOpen={isEditarClienteModalOpen}
        onClose={handleCloseEditarClienteModal}
        cliente={clienteEditado}
        onUpdateCliente={(cliente) => {
          const novosClientes = clientes.map(c => c.id === cliente.id ? cliente : c);
          setClientes(novosClientes);
          showSuccessMessage('Cliente atualizado com sucesso'); // Exibir mensagem de sucesso
        }}
        showErrorMessage={showErrorMessage} // Passando função de erro para o modal
      />
      {clienteSelecionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content p-8 bg-white rounded shadow-lg w-screen max-w-5xl mx-auto">
            <h2 className="text-lg font-semibold mb-6 text-center">Rota para {clienteSelecionado.nome}</h2>
            {/* Componente de mapa para exibir a rota */}
            <div className="mapa-modal">
              <Mapa coordenada_x={clienteSelecionado.coordenada_x} coordenada_y={clienteSelecionado.coordenada_y} />
            </div>
            <div className="flex justify-center mt-6">
              {/* Botão para fechar o modal */}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaClientes;
