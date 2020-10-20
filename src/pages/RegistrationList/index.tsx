import React, { FormEvent, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import StudentItem, { Student } from '../../components/StudentItem';
import Input from '../../components/Input';
import './styles.css'

import api from '../../services/api';
import RegistrationItem, {Registration} from "../../components/RegistrationItem";


function RegistrationList() {
  const [registration, setRegistration] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    api.get('registration').then(response => {
      setRegistration(response.data)
      console.log(response.data)
    })
  }, [])

  // useEffect(() => {
  //   setStudents()
  // }, [students])
  async function searchStudents(e: FormEvent) {
    e.preventDefault()

    const { data } = await api.get('registration', {
      params: {
        name
      }
    })

    setRegistration(data)
  }
  return (
    <div id="page-subject-list" className="container">
      <PageHeader title="Estas e a listagem de alunos disponiveis.">
        <form id="search-subject" onSubmit={searchStudents}>
          <Input 
            name="name" 
            label="Nome"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
           />

          <button type="submit">
            Buscar
          </button>
          <Link to="/registrationForm" type="button">
            + Novo cadastro
          </Link>
        </form>
      </PageHeader>

      <main>
        {registration.map((registration: Registration) => {
          return <RegistrationItem key={registration.id} registration={registration} />
        })}
      </main>
    </div>
  )
}

export default RegistrationList;