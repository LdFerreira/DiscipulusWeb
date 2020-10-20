import React, {ButtonHTMLAttributes, FormEvent} from 'react';


import './styles.css'
import {useHistory} from "react-router-dom";
import api from "../../services/api";

export interface Registration {
  id: string;
  name: string;
  subjects: [{
    title: string;
    description: string;
  }];

}

interface RegistrationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  registration: Registration;
}
const RegistrationItem: React.FC<RegistrationItemProps> = ({registration, ...rest}) => {
  const history = useHistory()

  async function handleDeleteRegistration(e: FormEvent,{id}: Registration) {
    e.preventDefault();

    await api.delete(`registration/${id}`).then(() => {
      alert('Matricula deletada com sucessp')
    }).catch((error) => {
      console.log(error)
      alert('Erro no cadastro')
    })
  }
  return (
    <article className="subject-item">
      <header>
        <div>
          <strong>{registration.name}</strong>
        </div>
      </header>
      {registration.subjects.map(({title}) => {
        return (
            <p>
              {title}
            </p>
        )
      })}


      <footer>
        <button type="button" className="delete" value={registration.id} onClick={(e) => handleDeleteRegistration(e,registration)}>
          Excluir
        </button>
        <button type="button" className="warning" value={registration.id} onClick={() => history.push('/registrationForm/' + registration.id)}>
          Editar
        </button>
      </footer>
    </article>
  )
}

export default RegistrationItem;