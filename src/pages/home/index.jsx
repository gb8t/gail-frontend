import { useState, useEffect, useRef } from 'react';
import api from '../../services/api'
import './style.css'

export default function Home() {
  const [pessoas, setPessoas] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputNascimento = useRef()
  const inputAltura = useRef()
  const inputPeso = useRef()
  const inputRaca = useRef()
  const inputRegiao = useRef()

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function getPessoas() {
    const pessoasFromApi = await api.get('/pessoas')
    setPessoas(pessoasFromApi.data)
  }

  async function createPessoa() {
    const today = new Date().toISOString().split('T')[0]
    const nome = inputNome.current.value
    const email = inputEmail.current.value
    const nascimento = inputNascimento.current.value
    const altura = inputAltura.current.value
    const peso = inputPeso.current.value
    const raca = inputRaca.current.value
    const regiao = inputRegiao.current.value

    // Basic validation
    if (!nome || !email || !nascimento || !altura || !peso || raca != "" || regiao != "" ) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    setErrorMessage(''); // Clear previous errors

    try {
      await api.post('/pessoas', {
          nome,
          email,
          nascimento: new Date(nascimento).toISOString().split('T')[0],
          altura,
          peso,
          raca,
          regiao,
          data_cadastro: today,
      })
     window.location.reload()
    } catch (err) {
      setErrorMessage("Erro ao enviar dados. Tente novamente.")
    }
  }

  async function deletePessoa(id) {
    await api.delete(`/pessoas/${id}`)
    window.location.reload()
  }

  useEffect(() => {
    getPessoas()
  }, [])

  return (
    <div className='container'>
      <h1>Dados Pessoais</h1>
      {errorMessage && <p className="error-message">&#9888; {errorMessage}</p>}
      <form>
        <input name='nome' type='text' placeholder='Nome' ref={inputNome} required/>
        <input name='email' type='email' placeholder='E-Mail' ref={inputEmail} required/>
        <input name='nascimento' type='date' placeholder='Data de nascimento' ref={inputNascimento} required/>
        <input name='altura' type='number' min="0" placeholder='Altura (cm)' ref={inputAltura} required/>
        <input name='peso' type='number' min="0" placeholder='Peso (kg)' ref={inputPeso} required/>
        <select name='raca' type='text' ref={inputRaca} required>
          <option value="">Selecione uma raça</option>
          <option value="AMARELO">Amarelo</option>
          <option value="BRANCO">Branco</option>
          <option value="INDIGENA">Indígena</option>
          <option value="PARDO">Pardo</option>
          <option value="PRETO">Preto</option>
        </select>
        <select name='regiao' type='text' ref={inputRegiao} required>
          <option value="">Selecione uma região</option>
          <option value="CENTRO-OESTE">Centro-Oeste</option>
          <option value="NORDESTE">Nordeste</option>
          <option value="NORTE">Norte</option>
          <option value="SUDESTE">Sudeste</option>
          <option value="SUL">Sul</option>
        </select>
        <button type='button' onClick={createPessoa}>Próximo →</button>
      </form>

      {pessoas.map((item, index) => (
        <div key={item.id} className='card'>
          <p>Nome: {item.nome}</p>
          <p>E-mail: {item.email}</p>
          <button type="button" className="delete-button" onClick={() => deletePessoa(item.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}
