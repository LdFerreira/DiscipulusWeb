import React, {ButtonHTMLAttributes, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import formatDate from '../../utils/formatDate';
import './styles.css'
import api from "../../services/api";

export interface Student {
    id: string;
    avatar: string;
    name: string;
    email: string;
    birth: string;
  
}

interface StudentItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  student: Student;
}
const StudentItem: React.FC<StudentItemProps> = ({student, ...rest}) =>{
  const history = useHistory()

    async function handleDeleteStudent(e: FormEvent,{id}: Student) {
        e.preventDefault();

        await api.delete(`student/${id}`).then(() => {
            alert('Cadastro realizado com sucesso')
        }).catch((error) => {
            console.log(error)
            alert('Erro no cadastro')
        })
    }
  return (
    <article className="subject-item">
      <header>
        <img src={student.avatar} alt={student.name}/>
        <div>
          <strong>{student.name}</strong>
          <span>{student.email}</span>
        </div>
      </header>

      <p>
       Data Nascimento
       <br />
       {formatDate(student.birth)}
      </p>
      <footer>
        <button type="button" className="delete" value={student.id} onClick={(e) => handleDeleteStudent(e,student)}>
          Excluir
        </button>
        <button type="button" className="warning" value={student.id} onClick={() => history.push('/studentForm/' + student.id)}>
          Editar
        </button>
      </footer>
    </article>
  )
}

export default StudentItem;