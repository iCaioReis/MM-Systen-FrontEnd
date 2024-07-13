import { useState, useEffect } from 'react';

import { GoPencil } from "react-icons/go";

import avatarPlaceholder from "../../assets/user.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Select } from "../../components/Select";

import { Container, Date, MainForm, Profile, Status } from "./styles";

export function CadastroCompetidor() {
    const [data, setData] = useState({
        id: "",
        nome: "",
        apelido: "",
        sexo: "",
        cpf: "",
        diaNascimento: "",
        mesNascimento: "",
        anoNascimento: "",
        idade: "",
        categoria: "",
        dataCategoria: "",
        telefone: "",
        email: "",
        endereco: "",
        numeroEndereco: "",
        bairroEndereco: "",
        cidadeEndereco: "",
        ufEndereco: "",
        paisEndereco: "",
        pix: "",
        banco: "",
        agencia: "",
        conta: "",
    });

    function handleData(){
        const infoUser = {
            id: "1",
            nome: "José da Silva",
            apelido: "Zé",
            sexo: "masculino",
            cpf: "12345678910",
            diaNascimento: "",
            mesNascimento: "",
            anoNascimento: "",
            idade: "",
            categoria: "",
            dataCategoria: "",
            telefone: "",
            email: "",
            endereco: "",
            numeroEndereco: "",
            bairroEndereco: "",
            cidadeEndereco: "",
            ufEndereco: "",
            paisEndereco: "",
            pix: "",
            banco: "",
            agencia: "",
            conta: "",
        }

        setData(infoUser)
        console.log(data)
        
    }

    const [apelido, setApelido] = useState("");
    const [nome, setNome] = useState("");
    const [sexo, setSexo] = useState("");
    const [cpf, setCpf] = useState("");
    const [categoria, setCategoria] = useState("");
    const [dataCategoria, setDataCategoria] = useState("");
    const [diaNascimento, setDiaNascimento] = useState("");
    const [mesNascimento, setMesNascimento] = useState("");
    const [anoNascimento, setAnoNascimento] = useState("");
    const [idade, setIdade] = useState("");

    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numeroEndereco, setNumeroEndereco] = useState("");
    const [bairroEndereco, setBairroEndereco] = useState("");
    const [cidadeEndereco, setCidadeEndereco] = useState("");
    const [ufEndereco, setUfEndereco] = useState("");
    const [paisEndereco, setPaisEndereco] = useState("");

    const [pix, setPix] = useState("");
    const [banco, setBanco] = useState("");
    const [agencia, setAgencia] = useState("");
    const [conta, setConta] = useState("");

    return (
        <Container>

            <Profile>
                <div>
                    <img src={avatarPlaceholder} alt="" />
                    <Input
                        title={"Apelido"}
                        mandatory
                        data={data.apelido && data.apelido }
                        placeholder={"Nome que aparecerá no telão"}
                    />
                    <Button><GoPencil />Editar</Button>
                    <Button 
                        type={"submit"}
                        onClick={e => handleData()}
                    >
                        Salvar
                    </Button>
                </div>

                <Button className={"danger"}>Desativar</Button>
            </Profile>

            <MainForm>
                <h1>Cadastro Competidor</h1>

                <Section title={"Dados competidor"} />
                <div className="flex">
                    <Input
                        title={"Nome"}
                        onChange={e => setNome(e.target.value)}
                        data={"teste"}
                        mandatory
                        placeholder="Digite o nome do competidor"
                    />
                    <Select
                        label={"Sexo"}
                        onChange={e => setSexo(e.target.value)}
                        mandatory
                        className={"larger-width"}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </Select>
                </div>
                <div className="flex">
                    <Input
                        title={"CPF"}
                        onChange={e => setCpf(e.target.value)}
                        dataType={"CPF"}
                        className={"input-larger-width"}
                        mandatory
                        placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"
                    />

                    <Date className="date">
                        <Input
                            title={"Nascimento"}
                            onChange={e => setDiaNascimento(e.target.value)}
                            className={"input-smaller-width"}
                            dataType={"NUMBER"}
                            mandatory
                            placeholder="Dia"
                        />
                        <Input
                            dataType={"NUMBER"}
                            onChange={e => setMesNascimento(e.target.value)}
                            className={"input-small-width"}
                            mandatory
                            placeholder="Mês"
                        />
                        <Input
                            dataType={"NUMBER"}
                            onChange={e => setAnoNascimento(e.target.value)}
                            mandatory
                            placeholder="Ano"
                        />
                        <Input
                            title={"Idade"}

                            className={"input-smaller-width"}
                            data={"27"}
                            disabled
                        />
                    </Date>

                    <Select
                        label={"Categoria"}
                        id={"categoria"}
                        name={"categoria"}
                        mandatory
                        className={"medium-width"}
                    >
                        <option value="kids">Kids</option>
                        <option value="mirim">Mirim</option>
                        <option value="juvenil">Juvenil</option>
                        <option value="iniciante">Iniciante</option>
                        <option value="feminino">Feminino</option>
                        <option value="adulto">Adulto</option>
                        <option value="master">Master</option>
                        <option value="aberta">Aberta</option>
                    </Select>

                    <Input
                        title={"Data categoria"}
                        data="11/07/2024"
                        className={"input-medium-width"}
                        disabled
                    />
                </div>

                <Section title={"Contato"} />

                <div className="flex">
                    <Input
                        title={"Telefone"}
                        placeholder="Ex.: (99) 99999-9999"
                    />

                    <Input
                        title={"E-mail"}
                        placeholder="Ex.: exemplo@email.com"
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"Endereço"}
                        placeholder="Ex. Rua, Avenida, Logradouro..."
                    />
                    <Input
                        className={"input-small-width"}
                        title={"Número"}
                        placeholder={"Nº"}
                    />
                    <Input
                        title={"Bairro"}
                        placeholder="Ex.: Centro"
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"Cidade"}
                        placeholder="Ex. Vitória da Conquista"
                    />
                    <Input
                        className={"input-small-width"}
                        title={"UF"}
                        placeholder={"Ex.: BA"}
                    />
                    <Input
                        title={"País"}
                        placeholder="Ex.: Brasil"
                    />
                </div>

                <Section title={"Dados bancários"} />

                <div className="flex">
                    <Input
                        title={"Chave pix"}
                        placeholder={"Ex.: (99)99999-9999"}
                    />
                    <Input
                        title={"Banco"}
                    />
                    <Input
                        title={"Agência"}
                    />
                    <Input
                        title={"Conta"}
                    />
                </div>

            </MainForm>

            <Status >
                <Input
                    title={"Número único"}
                    data={"01"}
                    disabled
                    status
                />
                <Input
                    title={"Situação do cadastro"}
                    data={"Ativo"}
                    disabled
                    status
                />
                <Input
                    title={"Data Cadastro"}
                    data={"01/01/2001"}
                    disabled
                    status
                />
            </Status>

        </Container>
    )
}