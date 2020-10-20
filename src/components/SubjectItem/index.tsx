import React, {ButtonHTMLAttributes, FormEvent} from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'
import {useHistory} from "react-router-dom";
import api from "../../services/api";
import {Student} from "../StudentItem";

export interface Subject {
  id: string;
  avatar: string;
  title: string;
  description: string;

}

interface SubjectItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  subject: Subject;
}
const SubjectItem: React.FC<SubjectItemProps> = ({subject, ...rest}) => {
  const history = useHistory()

  async function handleDeleteSubject(e: FormEvent,{id}: Subject) {
    e.preventDefault();

    await api.delete(`subject/${id}`).then(() => {
      alert('Materia deletada com sucessp')
    }).catch((error) => {
      console.log(error)
      alert('Erro no cadastro')
    })
  }
  return (
    <article className="subject-item">
      <header>
        <img src={subject.avatar} alt={subject.title}/>
        <div>
          <strong>{subject.title}</strong>
        </div>
      </header>

      <p>
        {subject.description}
      </p>
      <footer>
        <button type="button" className="delete" value={subject.id} onClick={(e) => handleDeleteSubject(e,subject)}>
          Excluir
        </button>
        <button type="button" className="warning" value={subject.id} onClick={() => history.push('/subjectForm/' + subject.id)}>
          Editar
        </button>
      </footer>
    </article>
  )
}

export default SubjectItem;