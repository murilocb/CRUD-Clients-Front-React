import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarClienteModal = ({ isOpen, onClose, cliente, onUpdateCliente }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');

  // Atualizar os estados locais quando o cliente for alterado
  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setEmail(cliente.email);
      setTelefone(cliente.telefone);
      setCoordenadaX(cliente.coordenada_x);
      setCoordenadaY(cliente.coordenada_y);
    }
  }, [cliente]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clienteAtualizado = {
      ...cliente,
      nome: nome,
      email: email,
      telefone: telefone,
      coordenada_x: coordenadaX,
      coordenada_y: coordenadaY
    };

    try {
      // Solicitação PUT para atualizar o cliente
      await axios.put(`${process.env.REACT_APP_API_URL}/clientes/${clienteAtualizado.id}`, clienteAtualizado);
      // onUpdateCliente com os novos dados
      onUpdateCliente(clienteAtualizado);
      // Fecha o modal
      onClose();
      // Exibir mensagem de sucesso
      toast.success('Cliente atualizado com sucesso!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      // Exibir mensagem de erro
      toast.error('Ocorreu um erro ao atualizar o cliente. Por favor, tente novamente mais tarde.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="flex items-center justify-center h-screen">
        <div className="modal-content p-8 bg-white rounded shadow-lg max-w-xl w-full">
          <h2 className="text-lg font-semibold mb-6 text-center">Editar Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="nome" className="block font-medium text-gray-700">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder='Nome'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="telefone" className="block font-medium text-gray-700">Telefone:</label>
              <InputMask
                mask="(99) 99999-9999"
                type="tel"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder='Telefone'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="coordenadaX" className="block font-medium text-gray-700">Coordenada X:</label>
              <InputMask
                mask="999.999999"
                type="text"
                id="coordenadaX"
                value={coordenadaX}
                onChange={(e) => setCoordenadaX(e.target.value)}
                placeholder='Coordenada X'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="coordenadaY" className="block font-medium text-gray-700">Coordenada Y:</label>
              <InputMask
                mask="999.999999"
                type="text"
                id="coordenadaY"
                value={coordenadaY}
                onChange={(e) => setCoordenadaY(e.target.value)}
                placeholder='Coordenada Y'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100"
              >
                Fechar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditarClienteModal;
