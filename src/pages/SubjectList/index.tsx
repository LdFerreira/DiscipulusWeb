import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import SubjectItem, {Subject} from '../../components/SubjectItem';
import Input from '../../components/Input';
import './styles.css'
import api from "../../services/api";
import {Student} from "../../components/StudentItem";

function SubjectList() {
    const [subjects, setSubjects] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        api.get('subject').then(response => {
            setSubjects(response.data)
        })
    }, [])
    // useEffect(() => {
    //     api.get('subject').then(response => {
    //         setSubjects(response.data)
    //     })
    // }, [subjects])
    async function searchSubjects(e: FormEvent) {
        e.preventDefault()

        const { data } = await api.get('subject', {
            params: {
                title,
                description
            }
        })

        setSubjects(data)
    }
  return (
    <div id="page-subject-list" className="container">
      <PageHeader title="Estas são as materias disponiveis.">
        <form id="search-subject" onSubmit={searchSubjects}>
          <Select 
            name="subject" 
            label="Materia"
            value={title}
            defaultValue="Selecione uma materia"
            options={[
                { value: '', label: 'Remover filtro' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Química', label: 'Química' },
                { value: 'História', label: 'História' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Inglês', label: 'Inglês' },
            ]}
            onChange={e => {
                setTitle(e.target.value)
            }}
          />

          <Input
              name="description"
              label="Descricao"
              value={description}
              onChange={e => {
                  setDescription(e.target.value)
              }}
          />
            <button type="submit">
                Buscar
            </button>
          <Link to="/subjectForm" type="button">
            + Novo cadastro
          </Link>
        </form>
      </PageHeader>

      <main>
          {subjects.map((subject: Subject) => {
             return <SubjectItem key={subject.id} subject={subject}/>
          })}

      </main>
    </div>
  )
}

export default SubjectList;