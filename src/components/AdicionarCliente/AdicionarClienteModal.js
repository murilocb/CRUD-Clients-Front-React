import React, { useState } from 'react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import validator from 'validator';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdicionarClienteModal = ({ isOpen, onClose, clientes, setClientes }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenada_y, setCoordenadaY] = useState('');
  const [coordenada_x, setCoordenadaX] = useState('');

  const handleAdicionarCliente = async (e) => {
    e.preventDefault();

    if (!nome || !email || !telefone) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error('Por favor, insira um email válido.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/clientes`, {
        nome,
        email,
        telefone,
        coordenada_y,
        coordenada_x
      });

      toast.success('Cliente adicionado com sucesso!');
      // Atualizar os dados da tabela com os dados atualizados do servidor
      setClientes([...clientes, {
        ...response.data,
        // Formatar a data
        distancia_km: 0.00000000000,
        created_at: format(new Date(response.data.created_at), 'dd/MM/yyyy')
      }]);
      onClose();
      // Resetar os campos para vazio
      setNome('');
      setEmail('');
      setTelefone('');
      setCoordenadaX('');
      setCoordenadaY('');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      toast.error('Ocorreu um erro ao adicionar o cliente. Por favor, tente novamente mais tarde.');
    }
  };

  const handleTelefoneChange = (e) => {
    const formattedTelefone = e.target.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
    setTelefone(formattedTelefone);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="flex items-center justify-center h-screen">
        <div className="modal-content p-8 bg-white rounded shadow-lg max-w-xl w-full">
          <h2 className="text-lg font-semibold mb-6 text-center">Adicionar Cliente</h2>
          <form onSubmit={handleAdicionarCliente}>
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
                onChange={handleEmailChange}
                placeholder='Email'
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="telefone" className="block font-medium text-gray-700">Telefone:</label>
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                id="telefone"
                value={telefone}
                onChange={handleTelefoneChange}
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
                value={coordenada_x}
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
                value={coordenada_y}
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
                Adicionar
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

export default AdicionarClienteModal;
