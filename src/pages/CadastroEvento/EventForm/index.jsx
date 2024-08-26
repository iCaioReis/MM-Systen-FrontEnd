import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";
import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Modal } from '../../../components/Modal/index.jsx';
import { Input } from "../../../components/Input/index.jsx";
import { Button } from "../../../components/Button/index.jsx";
import { Select } from "../../../components/Select/index.jsx";
import { Section } from "../../../components/Section/index.jsx";
import { SearchDropdown } from '../../../components/SearchDropdown/index.jsx';

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
    const [clearSelection, setClearSelection] = useState(false);
    const [selectedHorseId, setSelectedHorseId] = useState(null);
    const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModalAddUser, setShowModalAddUser] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (event && mode === 'show') {
            setData({ ...initialData, ...event });
        }
    }, [event, mode]);

    useEffect(() => {
        if (shouldSave) {
            handleSave();
            setShouldSave(false);
        }
    }, [shouldSave, data]);

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
    };

    const handleSaveCompetitor = () => {

        async function addCompetitorInAllProofs() {
            try {
                await api.post(`/allCategoryRegisters`,
                    {
                        "competitor_id": selectedCompetitorId,
                        "horse_id": selectedHorseId,
                        "event_id": params.id,
                        "categoryName": selectedCategory
                    });
                alert("Registro cadastrado com sucesso!");

                setSelectedCompetitorId(null);
                setSelectedHorseId(null);
                setSelectedCategory("");
                setClearSelection(true);
                setTimeout(() => setClearSelection(false), 0);
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                alert(errorMessage)
            }
        }
        addCompetitorInAllProofs();
    }

    const handleShowModalAddUser = () => {
        setShowModalAddUser(!showModalAddUser);
    };

    const refresh = () => {
        window.location.reload();
    };

    return (
        <Form>
            <Modal
                visible={showModalAddUser}
                onClose={handleShowModalAddUser}
                content={
                    <div className='content'>
                        <h2>Registrar competidores em todas as provas</h2>
                        <div className="flex">
                            <SearchDropdown
                                tabindex="0"
                                table="competitors"
                                onItemSelected={(id) => setSelectedCompetitorId(id)}
                                clearSelection={clearSelection}
                            />
                            <SearchDropdown
                                tabindex="1"
                                table="horses"
                                onItemSelected={(id) => setSelectedHorseId(id)}
                                clearSelection={clearSelection}
                            />
                            <Select
                                label={"Categoria"}
                                name="category"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                mandatory
                            >
                                <option value="">Selecione</option>
                                <option value="kids">Kids</option>
                                <option value="little">Mirim</option>
                                <option value="juvenile">Juvenil</option>
                                <option value="beginner">Iniciante</option>
                                <option value="female">Feminino</option>
                                <option value="adult">Adulto</option>
                                <option value="master">Master</option>
                                <option value="open">Aberta</option>
                            </Select>

                            <Button onClick={handleSaveCompetitor}>Adicionar</Button>
                        </div>
                    </div>
                }
            />

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
                    <Button type={"button"} onClick={() => handleShowModalAddUser()}>Registrar Competidor</Button>
                    <Button type={"button"}>Gerar Relatório</Button>
                </div>
                {mode != 'add' && isEditing && data.state == 'active' &&
                    <Button className={"danger"}
                        onClick={() => handleState("inative")}
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
                    value={FormatStatus(data.state)}
                    disabled
                    status
                />

                {mode != 'add' && data.state == 'active' &&
                    <Button onClick={() => handleState("finished_inscriptions")}  >
                        Encerrar inscrições
                    </Button>
                }
            </Status>
        </Form>
    );
}
