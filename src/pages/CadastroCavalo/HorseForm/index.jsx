import { useState, useEffect } from 'react';

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Section } from "../../../components/Section";
import { Select } from "../../../components/Select";

import { DateContainer, Form, MainForm, Profile, Status } from './styles';

const initialData = {
    id: "",
    state: "",
    cratedAt: "",
    surname: "",
    name: "",
    gender: "",
    registration: "",
    born: "",
    age: "",
    owner: "",
    march: ""
};

export function HorseForm({ horse, mode = "add" }) {
    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(mode === 'add');

    const calculateAge = (date) => {
        const today = new Date();
        const born = new Date(date);
    
        let age = today.getFullYear() - born.getFullYear();
        const month = today.getMonth() - born.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
            age--;
        }
        return(age)
    }

    useEffect(() => {
        if (horse && mode === 'show') {
            setData({ ...horse, age: calculateAge(horse.born) });
        }
    }, [horse, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'born') {
            updatedData.age = calculateAge(value);
            console.log(updatedData.born)
        }
        setData(updatedData);
    };

    const handleSave = () => {
        if (mode === 'add') {
            // Lógica para adicionar novo cavalo
        } else if (isEditing) {
            // Lógica para editar cavalo
        }
    };

    return (
        <Form>
            <Profile>
                <div>
                    <img src={avatarPlaceholder} alt="" />
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
                        <Button type={"button"} onClick={() =>  setIsEditing(true)}>
                            Editar
                        </Button>
                    )}
                </div>
                <Button className={"danger"}>Desativar</Button>
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
                        <option value="castrado">Castrado</option>
                        <option value="egua">Égua</option>
                        <option value="garanhao">Garanhão</option>
                    </Select>
                </div>
                <div className="flex">
                    <Input
                        title={"Registro"}
                        name="registration"
                        value={data.registration}
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
                            mandatory
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Idade"}
                            name="age"
                            value={data.age}
                            onChange={handleInputChange}
                            className={"input-smaller-width"}
                            
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
                        mandatory
                        className={"larger-width"}
                        disabled={!isEditing && mode !== 'add'}
                    >
                        <option value="batida">Batida</option>
                        <option value="picada">Picada</option>
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
                    value={data.state}
                    disabled
                    status
                />
                <Input
                    title={"Data Cadastro"}
                    value={data.cratedAt}
                    disabled
                    status
                />
            </Status>
        </Form>
    );
}
