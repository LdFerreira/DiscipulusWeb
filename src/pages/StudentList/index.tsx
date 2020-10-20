import React, { FormEvent, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import StudentItem, { Student } from '../../components/StudentItem';
import Input from '../../components/Input';
import './styles.css'

import api from '../../services/api';


function StudentList() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    api.get('student').then(response => {
      setStudents(response.data)
    })
  }, [])

  // useEffect(() => {
  //   setStudents()
  // }, [students])
  async function searchStudents(e: FormEvent) {
    e.preventDefault()

    const { data } = await api.get('student', {
      params: {
        name,
        email
      }
    })

    setStudents(data)
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
          
          <Input 
            name="email" 
            label="E-mail" 
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          <button type="submit">
            Buscar
          </button>
          <Link to="/studentForm" type="button">
            + Novo cadastro
          </Link>
        </form>
      </PageHeader>

      <main>
        {students.map((student: Student) => {
          return <StudentItem key={student.id} student={student} />
        })}
      </main>
    </div>
  )
}

export default StudentList;