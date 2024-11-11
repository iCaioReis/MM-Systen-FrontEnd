import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiCamera, FiTrash2 } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { api } from '../../../services/api.js';
import { updateProfilePicture } from '../../../utils/updateProfilePicture.js'

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";
import { Section } from "../../../components/Section";
import { ModalConfirm } from "../../../components/ModalConfirm";

import { DateContainer, Form, MainForm, Picture, Profile, Status } from './styles';

import { FormatDate, calculateHorseAge } from "../../../utils/formatDatas.js"

const initialData = {
    id: "",
    state: "active",
    created_at: "0000-00-00",
    surname: "",
    name: "",
    gender: "castrated",
    record: "",
    born: "",
    age: "",
    owner: "",
    march: "beat",
    chip: ""
};

export function HorseForm({ horse, mode = "add", refresh }) {
    const navigate = useNavigate();

    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(mode === 'add');

    const [avatar, setAvatar] = useState(avatarPlaceholder);
    const [avatarFile, setAvatarFile] = useState(null);
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

    useEffect(() => {
        if (horse && mode === 'show') {
            const avatarUrl = horse.picture ? `${api.defaults.baseURL}files/${horse.picture}` : avatarPlaceholder;

            setData({
                ...initialData,
                ...horse,
                age: calculateHorseAge(horse.born)
            });

            setAvatar(avatarUrl)
        }
    }, [horse, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'born') {
            updatedData.age = calculateHorseAge(value);
        }

        if (name === 'name') {
            updatedData.surname = value;
        }

        setData(updatedData);
    };
    const handleSave = () => {
        if (mode === 'add') {
            async function addHorse() {
                try {
                    const res = await api.post(`/horses`, data);
                    const { id } = res.data
                    toast.success("Cavalo registrado com sucesso!");
                    navigate(`/cadastro/cavalo/${id.id}`);
                    setIsEditing(false)
                    refresh();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            addHorse();

        } else if (isEditing) {
            if (avatarFile) {
                updateProfilePicture({ id: horse.id, table: "horses", avatarFile: avatarFile })
            }
            async function updateHorse() {
                try {
                    const res = await api.put(`/horses/${horse.id}`, data);
                    setIsEditing(false);
                    refresh();
                    toast.success("Registro do cavalo atualizado com sucesso!")
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            updateHorse();
        }

    };
    const handleState = () => {
        const newState = data.state == "active" ? "inative" : "active";

        setData({ ...data, state: newState });
    };
    function hadleChangeAvatar(event) {
        const file = event.target.files[0]; //Pega somente o primeiro arquivo que o usuário enviar

        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    };
    const handleModalConfirm = () => {
        setIsModalConfirmVisible(!isModalConfirmVisible);
    };
    const handleDeleteRegister = async (id) => {
        try {
            await api.delete(`/horses/${id}`);
            navigate(`/cadastro/cavalo`);
            toast.success("Registro excluído com sucesso!");
            setData(initialData);
            refresh();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage)
        }
        handleModalConfirm();
    };

    return (
        <Form>
            <ModalConfirm
                title={"Você têm certeza que deseja excluir o registro? "}
                subTitle={`Cavalo: ${data.name}`}
                visible={isModalConfirmVisible}
                onClose={handleModalConfirm}
                onConfirm={() => handleDeleteRegister(data.id)}
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

                    <Input
                        title={"Apelido"}
                        mandatory
                        value={data.surname}
                        name="surname"
                        onChange={handleInputChange}
                        placeholder={"Nome que aparecerá no telão"}
                        disabled={!isEditing && mode !== 'add'}
                    />
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
                </div>
                {mode != 'add' && isEditing && data.state == 'active' &&
                    <Button className={"danger"}
                        onClick={handleState}
                    >
                        Desativar
                    </Button>
                }
                {mode != 'add' && isEditing && data.state == 'inative' &&
                    <Button
                        onClick={handleState}
                    >
                        Ativar
                    </Button>
                }
            </Profile>

            <MainForm>
                <h1>Cadastro Cavalo</h1>

                <Section title={"Dados cavalo"} />
                <div className="flex">
                    <Input
                        title={"Nome"}
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        mandatory
                        placeholder="Digite o nome do cavalo"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Select
                        label={"Sexo"}
                        name="gender"
                        value={data.gender}
                        onChange={handleInputChange}
                        mandatory
                        className={"larger-width"}
                        disabled={!isEditing && mode !== 'add'}
                    >
                        <option value="castrated">Castrado</option>
                        <option value="mare">Égua</option>
                        <option value="stallion">Garanhão</option>
                    </Select>
                </div>
                <div className="flex">
                    <Input
                        title={"Registro"}
                        name="record"
                        value={data.record}
                        onChange={handleInputChange}
                        placeholder="Número de registro"
                        disabled={!isEditing && mode !== 'add'}
                        className={"input-larger-width"}
                    />

                    <Input
                        title={"Chip"}
                        name="chip"
                        value={data.chip}
                        onChange={handleInputChange}
                        placeholder="Número do chip"
                        className={"input-biglarger-width"}
                        disabled={!isEditing && mode !== 'add'}
                    />

                    <DateContainer className="date">
                        <Input
                            title={"Nascimento"}
                            name="born"
                            value={data.born}
                            onChange={handleInputChange}
                            type={"date"}
                            className={"input-large-width"}
                            mandatory
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Idade"}
                            name="age"
                            value={data.age}
                            onChange={handleInputChange}

                            disabled
                        />
                    </DateContainer>

                </div>
                <div className="flex">
                    <Input
                        title={"Proprietário"}
                        name="owner"
                        value={data.owner}
                        onChange={handleInputChange}
                        placeholder="Digite o nome do proprietário"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Select
                        label={"Marcha"}
                        name="march"
                        value={data.march}
                        onChange={handleInputChange}
                        className={"medium-width"}
                        mandatory
                        disabled={!isEditing && mode !== 'add'}
                    >
                        <option value="beat">Batida</option>
                        <option value="shredded">Picada</option>
                    </Select>
                </div>
            </MainForm>

            <Status>
                <div>
                    <Input
                        title={"Número único"}
                        value={data.id}
                        disabled
                        status
                    />
                    <Input
                        title={"Situação do cadastro"}
                        value={data.state == "active" ? "Ativo" : "Inativo"}
                        disabled
                        status
                    />
                    <Input
                        title={"Data Cadastro"}
                        value={FormatDate(data.created_at)}
                        disabled
                        status
                    />
                </div>

                {mode != 'add' && isEditing &&
                    <Button className={"danger inverted"}
                        onClick={handleModalConfirm}
                    >
                        <FiTrash2 />
                        Excluir
                    </Button>
                }

            </Status>
        </Form>
    );
}
