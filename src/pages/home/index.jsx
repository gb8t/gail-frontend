import { useState, useEffect, useRef } from 'react';
import api from '../../services/api'
import './style.css'

export default function Home() {
  const [pessoas, setPessoas] = useState([])

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputNascimento = useRef()
  const inputAltura = useRef()
  const inputPeso = useRef()
  const inputRaca = useRef()
  const inputRegiao = useRef()

  async function getPessoas() {
    const pessoasFromApi = await api.get('/pessoas')
    setPessoas(pessoasFromApi.data)
  }

  async function createPessoa() {
    const today = new Date().toISOString().split('T')[0]
    const birth = new Date(inputNascimento.current.value).toISOString().split('T')[0]
    console.log(birth)
    await api.post('/pessoas', {
      nome: inputNome.current.value,
      email: inputEmail.current.value,
      nascimento: birth,
      altura: inputAltura.current.value,
      peso: inputPeso.current.value,
      raca: inputRaca.current.value,
      regiao: inputRegiao.current.value,
      data_cadastro: today
    })
    window.location.reload()
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
      <form>
        <input name='nome' type='text' placeholder='Nome' ref={inputNome} required/>
        <input name='email' type='email' placeholder='E-Mail' ref={inputEmail} required/>
        <input name='nascimento' type='date' placeholder='Data de nascimento' ref={inputNascimento} required/>
        <input name='altura' type='number' min="0" placeholder='Altura (cm)' ref={inputAltura} required/>
        <input name='peso' type='number' min="0" placeholder='Peso (kg)' ref={inputPeso} required/>
        <select name='raca' type='text' ref={inputRaca} required>
          <option>Selecione uma raça</option>
          <option value="AMARELO">Amarelo</option>
          <option value="BRANCO">Branco</option>
          <option value="INDIGENA">Indígena</option>
          <option value="PARDO">Pardo</option>
          <option value="PRETO">Preto</option>
        </select>
        <select name='regiao' type='text' ref={inputRegiao} required>
          <option>Selecione uma região</option>
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
          <button type="button" onClick={() => deletePessoa(item.id)}>Deletar</button>
        </div>
      ))}
    </div>
  );
}
