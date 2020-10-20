import React, {FormEvent, useEffect, useState} from 'react';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import TextArea from '../../components/TextArea';
import {useHistory, useParams} from "react-router-dom";
import api from "../../services/api";
import Select from "../../components/Select";
function SubjectForm() {

    const history = useHistory()
    const [param, setParam] = useState('')
    const [avatar, setAvatar] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    let {id} = useParams();

    useEffect(() => {
        setParam(id);
        if(param){
            api.get(`subject/${param}`).then((response) => {
                setAvatar(response.data.avatar);
                setTitle(response.data.title);
                setDescription(response.data.description)
            });
        }

    }, [param,id])


    // useEffect(() => {
    //   api.get('')
    // }, []);

    function handleSubmitSubject(e: FormEvent) {
        e.preventDefault();
        if(param) {
            api.put(`subject/${param}`,{
                avatar,
                title,
                description,
            }).then(() => {
                alert('Cadastro realizado com sucesso')
                history.push('/subject')
            }).catch((error) => {
                console.log(error)
                alert('Erro no cadastro')
            })
        } else {
            api.post('subject', {
                avatar,
                title,
                description,
            }).then(() => {
                alert('Cadastro realizado com sucesso')
                history.push('/subject')
            }).catch((error) => {
                console.log(error)
                alert('Erro no cadastro')
            })
        }
    }
    return (
        <div id="page-subject-form" className="container">
            <PageHeader
                title="Vamos cadastrar uma materia."
                description="O primeiro passado e preencher esse formulario de escricao"
            />

            <main>
                <form onSubmit={handleSubmitSubject}>
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

                        <Select
                            name="title"
                            label="Titulo"
                            value={title}
                            options={[
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
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <TextArea
                            name="description"
                            label="Descricao"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
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