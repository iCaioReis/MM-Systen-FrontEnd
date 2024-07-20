import { useState, useEffect } from 'react';

import { GoPencil } from "react-icons/go";

import avatarPlaceholder from "../../assets/user.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Select } from "../../components/Select";
import { Table } from '../../components/Table';

import { Container, Date, Form, Listing, MainForm, Profile, Status } from "./styles";

export function CadastroCompetidor() {
    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page); // Atualiza a página ativa com base no botão clicado
    };
    
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

    useEffect(() => {
        const infoUser = {
            id: "1",
            nome: "José da Silva",
            apelido: "Zé",
            sexo: "masculino",
            cpf: "12345678910",
            diaNascimento: "01",
            mesNascimento: "01",
            anoNascimento: "1990",
            idade: "34",
            categoria: "adulto",
            dataCategoria: "11/07/2024",
            telefone: "11999999999",
            email: "ze@example.com",
            endereco: "Rua Exemplo",
            numeroEndereco: "123",
            bairroEndereco: "Centro",
            cidadeEndereco: "Cidade Exemplo",
            ufEndereco: "EX",
            paisEndereco: "Brasil",
            pix: "11999999999",
            banco: "Banco Exemplo",
            agencia: "1234",
            conta: "56789-0",
        };
        setData(infoUser);
    }, []);

    const handleChange = (e, formattedValue) => {
        const { name } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: formattedValue !== undefined ? formattedValue : e.target.value,
        }));
    };

    function consoleData() {
        console.log(data)
    }
    const larguras = {
        id: '',
        nome:  '400px',
        sexo:  '',
        categoria:  '',
        idade: '',
        dataRegistro:  '',
        status:  '',
        button:  ''
    }

    const header = {
        id: "Nº",
        nome: "Nome",
        sexo: "Sexo",
        categoria: "Categoria",
        idade: "Ïdade",
        dataRegistro: "Data Registro",
        status: "Status",
        button: " "
    }

    const rows = [
          {
            id: 1,
            nome: "Nome",
            sexo: "Sexo",
            categoria: "Categoria",
            idade: "16",
            data_registro: "Data Registro",
            status: "Status",
            button: <Button className={"noBackground"}>
                <GoPencil size={20}/>
            </Button>
          },
          {
            id: 2,
            nome: "Nome",
            sexo: "Sexo",
            categoria: "Categoria",
            idade: "20",
            data_registro: "Data Registro",
            status: "Status",
            button: <Button className={"noBackground"}>
                <GoPencil size={20}/>
            </Button>
          }
    ]

    return (
        <Container>

            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && (
            <Form>
                <Profile>
                    <div>
                        <img src={avatarPlaceholder} alt="" />
                        <Input
                            title={"Apelido"}
                            mandatory
                            value={data.apelido}
                            name="apelido"
                            onChange={handleChange}
                            placeholder={"Nome que aparecerá no telão"}
                        />
                        <Button><GoPencil />Editar</Button>
                        <Button type={"submit"} onClick={consoleData}>
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
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            mandatory
                            placeholder="Digite o nome do competidor"
                        />
                        <Select
                            label={"Sexo"}
                            name="sexo"
                            value={data.sexo}
                            onChange={handleChange}
                            mandatory
                            className={"larger-width"}
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </Select>
                    </div>
                    <div className="flex">
                        <Input
                            title={"CPF"}
                            name="cpf"
                            value={data.cpf}
                            onChange={handleChange}
                            dataType={"CPF"}
                            className={"input-larger-width"}
                            mandatory
                            placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"
                        />

                        <Date className="date">
                            <Input
                                title={"Nascimento"}
                                name="diaNascimento"
                                value={data.diaNascimento}
                                onChange={handleChange}
                                className={"input-smaller-width"}
                                dataType={"NUMBER"}
                                mandatory
                                placeholder="Dia"
                            />
                            <Input
                                name="mesNascimento"
                                value={data.mesNascimento}
                                onChange={handleChange}
                                className={"input-small-width"}
                                dataType={"NUMBER"}
                                mandatory
                                placeholder="Mês"
                            />
                            <Input
                                name="anoNascimento"
                                value={data.anoNascimento}
                                onChange={handleChange}
                                dataType={"NUMBER"}
                                mandatory
                                placeholder="Ano"
                            />
                            <Input
                                title={"Idade"}
                                name="idade"
                                value={data.idade}
                                className={"input-smaller-width"}
                                disabled
                            />
                        </Date>

                        <Select
                            label={"Categoria"}
                            name="categoria"
                            value={data.categoria}
                            onChange={handleChange}
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
                            value={data.dataCategoria}
                            name="dataCategoria"
                            className={"input-medium-width"}
                            disabled
                        />
                    </div>

                    <Section title={"Contato"} />

                    <div className="flex">
                        <Input
                            title={"Telefone"}
                            name="telefone"
                            value={data.telefone}
                            onChange={handleChange}
                            placeholder="Ex.: (99) 99999-9999"
                        />

                        <Input
                            title={"E-mail"}
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Ex.: exemplo@email.com"
                        />
                    </div>
                    <div className="flex">
                        <Input
                            title={"Endereço"}
                            name="endereco"
                            value={data.endereco}
                            onChange={handleChange}
                            placeholder="Ex. Rua, Avenida, Logradouro..."
                        />
                        <Input
                            className={"input-small-width"}
                            title={"Número"}
                            name="numeroEndereco"
                            value={data.numeroEndereco}
                            onChange={handleChange}
                            placeholder={"Nº"}
                        />
                        <Input
                            title={"Bairro"}
                            name="bairroEndereco"
                            value={data.bairroEndereco}
                            onChange={handleChange}
                            placeholder="Ex.: Centro"
                        />
                    </div>
                    <div className="flex">
                        <Input
                            title={"Cidade"}
                            name="cidadeEndereco"
                            value={data.cidadeEndereco}
                            onChange={handleChange}
                            placeholder="Ex. Vitória da Conquista"
                        />
                        <Input
                            className={"input-small-width"}
                            title={"UF"}
                            name="ufEndereco"
                            value={data.ufEndereco}
                            onChange={handleChange}
                            placeholder={"Ex.: BA"}
                        />
                        <Input
                            title={"País"}
                            name="paisEndereco"
                            value={data.paisEndereco}
                            onChange={handleChange}
                            placeholder="Ex.: Brasil"
                        />
                    </div>

                    <Section title={"Dados bancários"} />

                    <div className="flex">
                        <Input
                            title={"Chave pix"}
                            name="pix"
                            value={data.pix}
                            onChange={handleChange}
                            placeholder={"Ex.: (99)99999-9999"}
                        />
                        <Input
                            title={"Banco"}
                            name="banco"
                            value={data.banco}
                            onChange={handleChange}
                        />
                        <Input
                            title={"Agência"}
                            name="agencia"
                            value={data.agencia}
                            onChange={handleChange}
                        />
                        <Input
                            title={"Conta"}
                            name="conta"
                            value={data.conta}
                            onChange={handleChange}
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
                        value={"Ativo"}
                        disabled
                        status
                    />
                    <Input
                        title={"Data Cadastro"}
                        value={"01/01/2001"}
                        disabled
                        status
                    />
                </Status>
            </Form>
            )}

            {activePage === 'listagem' && (
            <Listing>

                <div className="flex">
                    <Button>Registrar competidor</Button>
                    <Input
                        title={" "}
                        placeholder={"Pesquisar por nome"}
                    />
                    <Input
                        title={"Registros"}
                        className={"input-small-width"}
                        value={2}
                        disabled
                    />
                </div>
                


                <Table header = {header} rows={rows} widths={larguras}></Table>
            </Listing>
            )}
        </Container>
    );
}