import { useState, useEffect } from 'react';

import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Section } from "../../../components/Section";
import { Select } from "../../../components/Select";

import { DateContainer, Form, MainForm, Picture, Profile, Status } from './styles';

const initialData = {
    id: "",
    state: "",
    cratedAt: "",

    picture: "",

    login: "",
    password: "",
    privileges: "",

    name: "",
    phone: "",
    gender: "",

    CPF: "",
    born: "",
    age: "",
    email: "",

    pix: "",
    bank: "",
    agency: "",
    account: ""
};

export function UserForm({ user, mode = "add" }) {
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
        return (age)
    }

    useEffect(() => {
        if (user && mode === 'show') {
            setData({ ...user, age: calculateAge(user.born) });
        }
    }, [user, mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'born') {
            updatedData.age = calculateAge(value);
            console.log(updatedData.born)
        }
        console.log(updatedData)
        setData(updatedData);
    };

    const handleSave = () => {
        if (mode === 'add') {
            // Lógica para adicionar novo usuário
        } else if (isEditing) {
            // Lógica para editar usuário
        }
    };

    return (
        <Form>
            <Profile>
                <div>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />
                        <label htmlFor="avatar">
                            <FiCamera /> Mudar foto
                            <input type="file" id="avatar" disabled={!isEditing && mode !== 'add'} />
                        </label>
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
                </div>
                <Button className={"danger"} >Desativar</Button>
            </Profile>

            <MainForm>
                <h1>Cadastro Usuário</h1>
                <Section title={"Dados login"} />

                <div className="flex">
                    <Input
                        title={"Login"}
                        name="login"
                        value={data.login}
                        onChange={handleInputChange}
                        mandatory
                        placeholder="Digite o login do usuário"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        title={"Senha"}
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        mandatory
                        placeholder="Digite a senha do usuário"
                        disabled={!isEditing && mode !== 'add'}
                    />

                    <Select
                        label={"Privilégios"}
                        name="privileges"
                        value={data.privileges}
                        onChange={handleInputChange}
                        mandatory
                        className={"larger-width"}
                        disabled={!isEditing && mode !== 'add'}
                    >
                        <option value="common">Usuário Comum</option>
                        <option value="administrator">Administrador</option>
                        <option value="judge">Juiz</option>
                        <option value="sup">SUP</option>
                    </Select>
                </div>

                <Section title={"Dados usuário"} />
                <div className="flex">
                    <Input
                        title={"Nome"}
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        mandatory
                        placeholder="Digite o nome do usuário"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        title={"Telefone"}
                        name="phone"
                        value={data.phone}
                        onChange={handleInputChange}
                        mandatory
                        className={"input-larger-width"}
                        placeholder="Ex.: (99) 9999-9999"
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
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                    </Select>
                </div>

                <div className="flex">
                    <Input
                        title={"CPF"}
                        name="CPF"
                        value={data.CPF}
                        onChange={handleInputChange}
                        dataType={"CPF"}
                        className={"input-larger-width"}
                        placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <DateContainer className="date">
                        <Input
                            title={"Nascimento"}
                            name="born"
                            value={data.born}
                            onChange={handleInputChange}
                            type={"date"}
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Idade"}
                            name="age"
                            value={data.age}
                            onChange={handleInputChange}
                            className={"input-small-width"}
                            disabled
                        />
                    </DateContainer>
                    <Input
                        title={"E-mail"}
                        name="email"
                        value={data.email}
                        placeholder={"Ex.: email@gmail.com"}
                        onChange={handleInputChange}
                        disabled={!isEditing && mode !== 'add'}
                    />
                </div>

                <Section title={"Dados Bancários"}/>
                <div className="flex">
                        <Input
                            title={"Chave pix"}
                            name="pix"
                            value={data.pix}
                            onChange={handleInputChange}
                            placeholder={"Ex.: (99)99999-9999"}
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Banco"}
                            name="bank"
                            value={data.bank}
                            onChange={handleInputChange}
                            placeholder="Ex.: Banco do Brasil"
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Agência"}
                            name="agency"
                            value={data.agency}
                            onChange={handleInputChange}
                            placeholder="Ex.: 188-0"
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Conta"}
                            name="account"
                            value={data.account}
                            onChange={handleInputChange}
                            placeholder="Ex.: 12345-0"
                            disabled={!isEditing && mode !== 'add'}
                        />
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
