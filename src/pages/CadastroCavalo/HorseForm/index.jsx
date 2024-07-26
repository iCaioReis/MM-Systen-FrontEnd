import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { api } from '../../../services/api.js';

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Section } from "../../../components/Section";
import { Select } from "../../../components/Select";

import { DateContainer, Form, MainForm, Picture, Profile, Status } from './styles';

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
    march: "beat"
};

export function HorseForm({ horse, mode = "add" }) {
    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(mode === 'add');
    const navigate = useNavigate();

    const calculateAge = (date) => {
        const today = new Date();
        const born = new Date(date);
    
        let years = today.getFullYear() - born.getFullYear();
        let months = today.getMonth() - born.getMonth();
        let days = today.getDate() - born.getDate();
    
        if (months < 0) {
            years--;
            months += 12;
        }
    
        if (days < 0) {
            months--;
            const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += lastDayOfPreviousMonth;
        }
    
        const totalMonths = (years * 12) + months;
        const totalDays = days;
    
        if (totalMonths === 0 && totalDays === 0) {
            return '';
        }
    
        return `${totalMonths} meses e ${totalDays} dias`;
    }
    
    function calculateDate(data) {
        const originalString = data;
        const [datePart] = originalString.split(' ');
        const [year, month, day] = datePart.split('-');

        const formattedDate = `${day}/${month}/${year}`;

        return (formattedDate);
    }

    useEffect(() => {
        if (horse && mode === 'show') {
            setData({ ...initialData, ...horse, age: calculateAge(horse.born) });
        }
    }, [horse, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'born') {
            updatedData.age = calculateAge(value);
        }
        setData(updatedData);
    };

    const handleSave = () => {
        if (mode === 'add') {
            async function addHorse() {
                try {
                    const res = await api.post(`/horses`, data);
                    const { id } = res.data
                    alert("Cavalo cadastrado com sucesso!")
                    navigate(`/cadastro/cavalo/${id.id}`);
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                }
            }
            addHorse();

        } else if (isEditing) {
            async function updateHorse() {
                try {
                    const res = await api.put(`/horses/${horse.id}`, data);
                    alert("Cavalo atualizado com sucesso!")
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                }
            }
            updateHorse();
        }
        
    };

    const handleState = () => {
        const newState = data.state == "active" ? "inative" : "active";

        setData({ ...data, state: newState });
    }

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
                        placeholder="Digite aqui o número de registro"
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
                    value={calculateDate(data.created_at)}
                    disabled
                    status
                />
            </Status>
        </Form>
    );
}
