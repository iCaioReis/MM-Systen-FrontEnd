import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiCamera } from 'react-icons/fi';

import avatarPlaceholder from "../../../assets/user.svg";

import { api } from '../../../services/api.js';
import { updateProfilePicture } from '../../../utils/updateProfilePicture.js'

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Section } from "../../../components/Section";
import { Select } from "../../../components/Select";

import { DateContainer, Form, MainForm, Picture, Profile, Status } from './styles';

const initialData = {
    id: "",
    state: "active",
    created_at: "",

    picture: avatarPlaceholder,

    login: "",
    password: "",
    privilege: "common",

    name: "",
    phone: "",
    gender: "male",

    CPF: "",
    born: "",
    age: "",
    email: "",

    pix: "",
    favored: "",
    
    bank: "",
    agency: "",
    account: ""
};

export function UserForm({ user, mode = "add" }) {
    const navigate = useNavigate();

    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(mode === 'add');

    const [avatar, setAvatar] = useState(avatarPlaceholder);
    const [avatarFile, setAvatarFile] = useState(null);

    const calculateAge = (date) => {
        const today = new Date();
        const born = new Date(date);

        let age = today.getFullYear() - born.getFullYear();
        const month = today.getMonth() - born.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
            age--;
        }

        if(!age){
            return ('')
        }

        return (age)
    };

    function calculateDate(data) {
        const originalString = data;
        const [datePart] = originalString.split(' ');
        const [year, month, day] = datePart.split('-');

        const formattedDate = `${day}/${month}/${year}`;

        return(formattedDate);
    };

    useEffect(() => {
        if (user && mode === 'show') {
            const avatarUrl = user.picture ? `${api.defaults.baseURL}files/${user.picture}` : avatarPlaceholder;

            setData({ 
                ...initialData , 
                ...user, 
                age: calculateAge(user.born),

            });

            setAvatar(avatarUrl)
        }
    }, [user, mode]);

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
            async function addUser() {
                try {
                    const res = await api.post(`/users`, data);
                    const { id } = res.data
                    alert("Usuário criado com sucesso!")
                    navigate(`/cadastro/usuario/${id.id}`);
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                }
            }
            addUser();

        } else if (isEditing) {
            if(avatarFile){
                updateProfilePicture({id: user.id, table: "users", avatarFile: avatarFile})
            }
            async function updateUser() {
                try {
                    const res = await api.put(`/users/${user.id}`, data);
                    alert("Usuário atualizado com sucesso!")
                    window.location.reload();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    alert(errorMessage)
                }
            }
            updateUser();
        }
    };

    const handleState = () => {
        const newState = data.state == "active" ? "inative" : "active";

        setData({...data, state: newState});
    };

    function hadleChangeAvatar(event){
        const file = event.target.files[0]; //Pega somente o primeiro arquivo que o usuário enviar

        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    };

    return (
        <Form>
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
                        name="privilege"
                        value={data.privilege}
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

                <Section title={"Dados Bancários"} />
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
                        title={"Favorecido"}
                        name="favored"
                        value={data.favored}
                        onChange={handleInputChange}
                        placeholder={"Ex.: João Silva"}
                        disabled={!isEditing && mode !== 'add'}
                    />
                </div>
                <div className="flex">
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
