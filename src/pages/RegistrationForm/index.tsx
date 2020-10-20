import React, {FormEvent, useEffect, useState} from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { useHistory,useParams } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from "../../components/Select";
import './styles.css';
import api from '../../services/api';

function RegistrationForm() {
  const history = useHistory()
  const [param, setParam] = useState('')
  const [name, setName] = useState('')
  const [subjects, setSubjects] = useState([])
  const [subjectsItems, setSubjectsItems] = useState([
    {title: ''}
  ]);
  let {id} = useParams();


  useEffect(() => {
    setParam(id);
    if(param){
      api.get(`registration/${param}`).then((response) => {
        setName(response.data.name);
        setSubjects(response.data.subjects)
      });
    }

  }, [param,id])
  useEffect(() => {
    api.get('subject').then(response => {
      setSubjects(response.data)
    })
  }, [])


  function addNewSubjectItem() {
    setSubjectsItems([...subjectsItems,
      {title: ''},
    ]);
  }
  function handleSubmitUser(e: FormEvent) {
    e.preventDefault();
    if(param) {
      api.put(`registration/${param}`,{
        name,
        subjects,
      }).then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/registration')
      }).catch((error) => {
        console.log(error)
        alert('Erro no cadastro')
      })
    } else {
      api.post('registration', {
        name,
        subjects
      }).then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/registration')
      }).catch((error) => {
        console.log(error)
        alert('Erro no cadastro')
      })
    }
  }
  return (
      <div id="page-subject-form" className="container">
        <PageHeader
            title="Vamos cadastrar uma Matricula."
            description="O primeiro passado e preencher esse formulario de escricao"
        />

        <main>
          <form onSubmit={handleSubmitUser}>
            <fieldset>
              <legend>Seus dados</legend>

              <Input
                  name="name"
                  label="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
              />

            </fieldset>
            <fieldset>
              <legend>
                Materias diponiveis
                <button onClick={addNewSubjectItem} type="button">+ Novo Horário</button>
              </legend>
              {subjectsItems.map((scheduleItem, index) => {
                return (
                      <Select
                          name="subject"
                          label="Materias"
                          value={subjects}
                          options={subjects.map(({title}) => (
                            {value: title, label: title})
                          )}
                      />
                );
              })}
            </fieldset>
            <footer>
              <p>
                <img src={warningIcon} alt="Aviso importante"/>
                Importe! <br />
                Preencha tudos os dados
              </p>
              <button type="submit">
                Salvar cadastro
              </button>
            </footer>
          </form>
        </main>


      </div>
  )
}

export default RegistrationForm;