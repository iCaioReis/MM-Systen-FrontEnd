import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

import { FaArrowRight } from "react-icons/fa6";
import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus, FormatCategory } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';
import { updateProfilePicture } from '../../../utils/updateProfilePicture.js'

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

export function EventFormm({ event, mode = "add", refresh }) {
    const [data, setData] = useState(initialData);

    const [shouldSave, setShouldSave] = useState(false);
    const [isEditing, setIsEditing] = useState(mode === 'add');
    const [clearSelection, setClearSelection] = useState(false);
    const [selectedHorseId, setSelectedHorseId] = useState(null);
    const [selectedCompetitorId, setSelectedCompetitorId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [avatar, setAvatar] = useState(avatarPlaceholder);
    const [avatarFile, setAvatarFile] = useState(null);
    const [selectedHorse, setSelectedHorse] = useState(null);
    const [selectedCompetitor, setSelectedCompetitor] = useState(null);
    const [lastRegisters, setLastRegisters] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (event && mode === 'show') {
            const avatarUrl = event.picture ? `${api.defaults.baseURL}files/${event.picture}` : avatarPlaceholder;

            setData({
                ...initialData,
                ...event
            });

            setAvatar(avatarUrl);
        }
    }, [event, mode]);

    useEffect(() => {
        if (shouldSave) {
            handleSave();
            setShouldSave(false);
        }
    }, [shouldSave, data]);

    useEffect(() => {
        if (selectedCompetitor) {
            setSelectedCompetitorId(selectedCompetitor.id)
            setSelectedCategory(selectedCompetitor.category)
        }
    }, [selectedCompetitor]);

    useEffect(() => {
        if (selectedHorse) {
            setSelectedHorseId(selectedHorse.id)
        }
    }, [selectedHorse]);

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
                    const { id } = res.data;
                    toast.success("Evento cadastrado com sucesso!");
                    navigate(`/cadastro/evento/${id}`);
                    refresh();
                    setIsEditing(false)
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            addEvent();

        } else {
            if (avatarFile) {
                updateProfilePicture({ id: event.id, table: "events", avatarFile: avatarFile })
            }
            async function updateEvent() {
                try {
                    const res = await api.put(`/events/${event.id}`, data);
                    toast.success("Evento atualizado com sucesso!")
                    refresh();
                    setIsEditing(false)
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
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

                setLastRegisters([...lastRegisters, { competitor: selectedCompetitor.name, horse: selectedHorse.name, category: selectedCategory }]);
                setSelectedCompetitorId(null);
                setSelectedHorseId(null);
                setSelectedCategory("");
                setClearSelection(true);

                toast.success("Registro cadastrado com sucesso!");

                setTimeout(() => setClearSelection(false), 0);

            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage);
            }
        }
        addCompetitorInAllProofs();
    };
    const handleShowModalAddUser = () => {
        setShowModalAddUser(!showModalAddUser);
        if (showModalAddUser) {
            refresh();
        }
    };
    function hadleChangeAvatar(event) {
        const file = event.target.files[0]; //Pega somente o primeiro arquivo que o usuário enviar

        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    };
    function navigateToPrintPage(id) {
        window.open(`/evento/impressao/${id}`, '_blank');
    };
    function navigateToPrintHorsePage(id) {
        window.open(`/evento/impressaoCavalos/${id}`, '_blank');
    };
    function navigateToPrintCompetitors(id) {
        window.open(`/evento/impressaoCompetidores/${id}`, '_blank');
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
                                onItemSelected={(id) => setSelectedCompetitor(id)}
                                clearSelection={clearSelection}
                            />
                            <SearchDropdown
                                tabindex="1"
                                table="horses"
                                onItemSelected={(id) => setSelectedHorse(id)}
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
                                <option value="kids">Kids (04 - 07 anos)</option>
                                <option value="little">Mirim (08 - 12 anos)</option>
                                <option value="juvenile">Juvenil (13 - 17 anos)</option>
                                <option value="beginner">Iniciante</option>
                                <option value="female">Feminino</option>
                                <option value="adult">Adulto (18 - 49 anos)</option>
                                <option value="master">Master ( &gt; de 50 anos )</option>
                                <option value="open">Aberta</option>
                            </Select>

                            <Button onClick={handleSaveCompetitor}>Adicionar</Button>
                            <ToastContainer />
                        </div>

                        {
                            lastRegisters &&

                            <div className='lastRegisters'>
                                <Section title={"Últimos registros"} />

                                <div className="lastRegistersTable">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='col1'>Competidor</th>
                                                <th className='col1'>Cavalo</th>
                                                <th className='col2'>Categoria</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lastRegisters.slice().reverse().map((register) => {
                                                return (
                                                    <tr className='register'>
                                                        <td>{register.competitor}</td>
                                                        <td>{register.horse}</td>
                                                        <td className='col2'>{FormatCategory(register.category)}</td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }


                    </div>
                }
            />

            <Profile>
                <div>
                    <Picture>
                        <img src={avatar} alt="" />
                        {mode != "add" && isEditing && (
                            <label htmlFor="avatar">
                                <FiCamera /> Mudar foto
                                <input
                                    type="file"
                                    id="avatar"
                                    onChange={hadleChangeAvatar}
                                    disabled={!isEditing && mode !== 'add'}
                                />
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
                    {params.id &&
                        <Button type={"button"} onClick={() => handleShowModalAddUser()}>Registrar Competidor</Button>
                    }
                </div>
                <div>
                    {params.id &&
                        <Button type={"button"} onClick={() => navigateToPrintPage(params.id)}>Imprimir Evento</Button>
                    }
                    {params.id &&
                        <Button type={"button"} onClick={() => navigateToPrintHorsePage(params.id)}>Imprimir Cavalos</Button>
                    }
                    {params.id &&
                        <Button type={"button"} onClick={() => navigateToPrintCompetitors(params.id)}>Imprimir Competidores</Button>
                    }


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
                </div>
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

            <ToastContainer />
        </Form>
    );
}