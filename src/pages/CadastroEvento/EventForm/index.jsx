import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";
import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Input } from "../../../components/Input/index.jsx";
import { Button } from "../../../components/Button/index.jsx";
import { Section } from "../../../components/Section/index.jsx";

import { List } from '../List/index.jsx';

import { CategoriesContainer, DateContainer, Form, MainForm, Status, Profile, Picture } from './styles.js';

const initialData = {
    id: "",
    state: "active",
    created_at: "0000-00-00",
    name: "",
    start_date: "",
    end_date: "",
};

export function EventFormm({ event, mode = "add" }) {
    const [data, setData] = useState(initialData);
    const [shouldSave, setShouldSave] = useState(false);
    const [isEditing, setIsEditing] = useState(mode === 'add');
    const navigate = useNavigate();

    const refresh = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (event && mode === 'show') {
            setData({ ...initialData, ...event });
        }
    }, [event, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };
        setData(updatedData);
    };

    const handleSave = () => {
        if (mode === 'add') {
            async function addEvent() {
                try {
                    const res = await api.post(`/events`, data);
                    const { id } = res.data
                    alert("Evento cadastrado com sucesso!")
                    navigate(`/cadastro/evento/${id}`);
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                }
            }
            addEvent();

        } else {
            async function updateEvent() {
                try {
                    const res = await api.put(`/events/${event.id}`, data);
                    alert("Evento atualizado com sucesso!")
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                    window.location.reload();
                }
            }
            updateEvent();
        }
    };

    const handleState = (state) => {
        const newState = state;

        setData({ ...data, state: newState });

        setShouldSave(true);
    }

    useEffect(() => {
        if (shouldSave) {
            handleSave();
            setShouldSave(false);
        }
    }, [shouldSave, data]);

    return (
        <Form>
            <Profile>
                <div>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />
                        {mode != "add" && isEditing && (
                            <label htmlFor="avatar">
                                <FiCamera /> Mudar foto
                                <input type="file" id="avatar" disabled={!isEditing && mode !== 'add'} />
                            </label>
                        )}
                    </Picture>

                    {isEditing && (
                        <Button type={"button"} onClick={handleSave}>
                            Salvar
                        </Button>
                    )}
                    {mode !== 'add' && !isEditing && (
                        <Button type={"button"} onClick={() => setIsEditing(true)}>
                            Editar
                        </Button>
                    )}
                    <Button type={"button"}>Registrar Competidor</Button>
                    <Button type={"button"}>Gerar Relatório</Button>
                </div>
                {mode != 'add' && isEditing && data.state == 'active' &&
                    <Button className={"danger"}
                        onClick={() => handleState( "inative")}
                    >
                        Desativar
                    </Button>
                }
                {mode != 'add' && isEditing && (data.state == 'inative' || data.state == 'finished_inscriptions') &&
                    <Button
                        onClick={() => handleState("active")}
                    >
                        Reativar
                    </Button>
                }
            </Profile>

            <MainForm>
                <h1>Cadastro Evento</h1>

                <Section title={"Dados evento"} />

                <div className="flex">
                    <Input
                        title={"Nome do evento"}
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        mandatory
                        placeholder="Digite o nome do evento"
                        disabled={!isEditing && mode !== 'add'}
                    />

                    <DateContainer className="date">
                        <Input
                            title={"Data início"}
                            name="start_date"
                            value={data.start_date}
                            onChange={handleInputChange}
                            type={"date"}
                            className={"input-larger-width"}
                            mandatory
                            disabled={!isEditing && mode !== 'add'}
                        />

                        <FaArrowRight size={20} />

                        <Input
                            title={"Data fim"}
                            name="end_date"
                            value={data.end_date}
                            onChange={handleInputChange}
                            type={"date"}
                            className={"input-larger-width"}
                            mandatory
                            disabled={!isEditing && mode !== 'add'}
                        />
                    </DateContainer>
                </div>

                <Section title={"Provas"} />

                <CategoriesContainer>
                    {data.proofs && data.proofs.map((proof, index) => {
                        return (
                            <List key={index} title={proof.name} categories={proof.categories} refresh={refresh}></List>
                        )
                    })}
                </CategoriesContainer>

            </MainForm>

            <Status>
               
                    <Input
                        title={"Número único"}
                        value={data.id}
                        disabled
                        status
                    />
                    <Input
                        title={"Status"}
                        value={FormatStatus (data.state)}
                        disabled
                        status
                    />

                {mode != 'add' && data.state == 'active' &&
                    <Button onClick={() => handleState( "finished_inscriptions")}  >
                        Encerrar inscrições
                    </Button>
                }
            </Status>
        </Form>
    );
}
