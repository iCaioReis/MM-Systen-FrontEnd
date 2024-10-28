import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FiCamera , FiTrash2} from 'react-icons/fi';

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
    created_at: "0000-00-00",

    picture: "",
    surname: "",

    name: "",
    gender: "male",

    CPF: "",
    born: "",
    category: "kids",
    category_date: "0000-00-00",

    phone: "",
    email: "",

    address: "",
    address_number: "",
    address_neighborhood: "",
    address_city: "",
    address_uf: "",
    address_country: "",

    pix: "",
    favored: "",

    bank: "",
    agency: "",
    account: ""
};

export function CompetitorForm({ competitor, mode = "add", refresh }) {
    const navigate = useNavigate();

    const [data, setData] = useState(initialData);
    const [age, setAge] = useState(0);

    const [isEditing, setIsEditing] = useState(mode === 'add');

    const [avatar, setAvatar] = useState(avatarPlaceholder);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        if (competitor && mode === 'show') {
            const avatarUrl = competitor.picture ? `${api.defaults.baseURL}files/${competitor.picture}` : avatarPlaceholder;

            setData({
                ...initialData,
                ...competitor,
                age: calculateAge(competitor.born)
            });
            setAge(calculateAge(competitor.born));
            setAvatar(avatarUrl)
        }
    }, [competitor, mode]);

    const handleChange = (e, formattedValue) => {
        const { name, value } = e.target;

        setData((prevData) => {
            const newValue = formattedValue !== undefined ? formattedValue : value;

            if (name === 'name') {
                return {
                    ...prevData,
                    [name]: newValue,
                    surname: newValue, // Atualizando o campo surname com o mesmo valor do campo name
                };
            }
            return {
                ...prevData,
                [name]: newValue,
            };
        });
    };
    const calculateAge = (date) => {
        const today = new Date();
        const born = new Date(date);

        let age = today.getFullYear() - born.getFullYear();
        const month = today.getMonth() - born.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
            age--;
        }

        if (!age) {
            return ('')
        }

        return (age)
    };
    function calculateDate(data) {
        const originalString = data;
        const [datePart] = originalString.split(' ');
        const [year, month, day] = datePart.split('-');

        const formattedDate = `${day}/${month}/${year}`;

        return (formattedDate);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'born') {
            setAge(calculateAge(value));
        }

        if (name === "name") {
            updatedData = { ...updatedData, surname: value };
        }

        setData(updatedData);
    };
    const handleSave = () => {
        if (mode === 'add') {
            async function addCompetitor() {
                try {
                    const res = await api.post(`/competitors`, data);
                    const { id } = res.data

                    toast.success("Competidor registrado com sucesso!");
                    navigate(`/cadastro/competidor/${id.id}`);
                    setIsEditing(false);
                    refresh();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            addCompetitor();

        } else if (isEditing) {
            if (avatarFile) {
                updateProfilePicture({ id: competitor.id, table: "competitors", avatarFile: avatarFile })
            }
            async function updateCompetitor() {
                try {
                    await api.put(`/competitors/${competitor.id}`, data);
                    toast.success("Competidor atualizado com sucesso!");
                    setIsEditing(false);
                    refresh();
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            updateCompetitor();
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
                <h1>Cadastro Competidor</h1>

                <Section title={"Dados competidor"} />
                <div className="flex">
                    <Input
                        title={"Nome"}
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        mandatory
                        placeholder="Digite o nome do competidor"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Select
                        label={"Sexo"}
                        name="gender"
                        value={data.gender}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        dataType={"CPF"}
                        className={"input-larger-width"}
                        mandatory
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
                            className={"input-larger-width"}
                            mandatory
                            disabled={!isEditing && mode !== 'add'}
                        />
                        <Input
                            title={"Idade"}
                            name="age"
                            value={age}
                            onChange={handleInputChange}
                            className={"input-small-width"}
                            disabled
                        />
                    </DateContainer>

                    <Select
                        label={"Categoria"}
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        mandatory
                        className={"medium-width"}
                        disabled={!isEditing && mode !== 'add'}
                    >
                        <option value="kids">Kids (04 - 07 anos)</option>
                        <option value="little">Mirim (08 - 12 anos)</option>
                        <option value="juvenile">Juvenil (13 - 17 anos)</option>
                        <option value="beginner">Iniciante</option>
                        <option value="female">Feminino</option>
                        <option value="adult">Adulto (18 - 49 anos)</option>
                        <option value="master">Master ( &gt; de 50 anos )</option>
                        <option value="open">Aberta</option>
                    </Select>

                    <Input
                        title={"Data categoria"}
                        value={data.category_date}
                        name="category_date"
                        className={"input-medium-width"}
                        disabled
                    />
                </div>

                <Section title={"Contato"} />

                <div className="flex">
                    <Input
                        title={"Telefone"}
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        placeholder="Ex.: (99) 99999-9999"
                        disabled={!isEditing && mode !== 'add'}
                    />

                    <Input
                        title={"E-mail"}
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Ex.: exemplo@email.com"
                        disabled={!isEditing && mode !== 'add'}
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"Endereço"}
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        placeholder="Ex. Rua, Avenida, Logradouro..."
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        className={"input-small-width"}
                        title={"Número"}
                        name="address_number"
                        value={data.address_number}
                        onChange={handleChange}
                        placeholder={"Nº"}
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        title={"Bairro"}
                        name="address_neighborhood"
                        value={data.address_neighborhood}
                        onChange={handleChange}
                        placeholder="Ex.: Centro"
                        disabled={!isEditing && mode !== 'add'}
                    />
                </div>

                <div className="flex">
                    <Input
                        title={"Cidade"}
                        name="address_city"
                        value={data.address_city}
                        onChange={handleChange}
                        placeholder="Ex. Vitória da Conquista"
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        className={"input-larger-width"}
                        title={"UF"}
                        name="address_uf"
                        value={data.address_uf}
                        onChange={handleChange}
                        placeholder={"Ex.: BA"}
                        disabled={!isEditing && mode !== 'add'}
                    />
                    <Input
                        title={"País"}
                        name="address_country"
                        value={data.address_country}
                        onChange={handleChange}
                        placeholder="Ex.: Brasil"
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
                        value={calculateDate(data.created_at)}
                        disabled
                        status
                    />
                </div>

                {mode != 'add' && isEditing &&
                    <Button className={"danger inverted"}
                        onClick={handleState}
                    >
                        <FiTrash2/>
                        Excluir
                    </Button>
                }
            </Status>

            <ToastContainer />
        </Form>
    )
}