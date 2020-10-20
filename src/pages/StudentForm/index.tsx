import React, {FormEvent, useEffect, useState} from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { useHistory,useParams } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function SubjectForm() {
  const history = useHistory()
  const [param, setParam] = useState('')
  const [avatar, setAvatar] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birth, setBirth] = useState('')
  let {id} = useParams();


  useEffect(() => {
    setParam(id);
    if(param){
      api.get(`student/${param}`).then((response) => {
        setAvatar(response.data.avatar);
        setName(response.data.name);
        setEmail(response.data.email)
        setBirth(response.data.birth);
      });
    }

  }, [param,id])


  // useEffect(() => {
  //   api.get('')
  // }, []);

  function handleSubmitUser(e: FormEvent) {
    e.preventDefault();
    if(param) {
      api.put(`student/${param}`,{
        avatar,
        name,
        email,
        birth
      }).then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/student')
      }).catch((error) => {
        console.log(error)
        alert('Erro no cadastro')
      })
    } else {
      api.post('student', {
        avatar,
        name,
        email,
        birth
      }).then(() => {
        alert('Cadastro realizado com sucesso')
        history.push('/student')
      }).catch((error) => {
        console.log(error)
        alert('Erro no cadastro')
      })
    }
  }
  return (
      <div id="page-subject-form" className="container">
        <PageHeader
            title="Vamos cadastrar um aluno."
            description="O primeiro passado e preencher esse formulario de escricao"
        />

        <main>
          <form onSubmit={handleSubmitUser}>
            <fieldset>
              <legend>Seus dados</legend>
              <Input
                  name="avatar"
                  label="Avatar"
                  value={avatar}
                  onChange={(e) => {
                    setAvatar(e.target.value)
                  }}
              />

              <Input
                  name="name"
                  label="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
              />

              <Input
                  name="email"
                  label="E-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
              />
              <Input
                  name="birth"
                  label="Data de nascimento"
                  value={birth}
                  type="date"
                  onChange={(e) => {
                    setBirth(e.target.value)
                  }}
              />
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

export default SubjectForm;