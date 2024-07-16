import { useState, useEffect } from 'react';

import { GoPencil } from "react-icons/go";

import avatarPlaceholder from "../../assets/user.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Select } from "../../components/Select";
import { Table } from '../../components/Table';

import { Container, Date, Form, Listing, MainForm, Profile, Status } from "./styles";

export function CadastroCavalo() {
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
                        <Button type={"submit"} onClick={consoleData}>
                            Salvar
                        </Button>
                    </div>
                    <Button className={"danger"}>Desativar</Button>
                </Profile>

                <MainForm>
                    <h1>Cadastro Cavalo</h1>

                    <Section title={"Dados cavalo"} />
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
                            <option value="castrado">Castrado</option>
                            <option value="egua">Égua</option>
                            <option value="garanhao">Garanhão</option>
                        </Select>
                    </div>
                    <div className="flex">
                        <Input
                            title={"Registro"}
                            name="registro"
                            onChange={handleChange}
                            mandatory
                            placeholder="Digite aqui o número de registro"
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
                    
                    </div>
                    <div className="flex">
                        <Input
                            title={"Proprietário"}
                            name="proprietario"
                            onChange={handleChange}
                            placeholder="Digite o nome do proprietário"
                        />
                        <Select
                            label={"Marcha"}
                            name="marcha"
                            mandatory
                            className={"larger-width"}
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
