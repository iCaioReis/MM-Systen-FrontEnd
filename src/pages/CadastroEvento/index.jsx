import { useState, useEffect } from 'react';

import { GoPencil } from "react-icons/go";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Select } from "../../components/Select";
import { Table } from '../../components/Table';

import { CategoryMenu, Container, Date, Form, Listing, MainForm, Status } from "./styles";

export function CadastroEvento() {
    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page); // Atualiza a página ativa com base no botão clicado
    };

    const [data, setData] = useState({
        id: "",
        nome: "",
        categoria: "",
    });

    useEffect(() => {
        const infoUser = {
            id: "1",
            nome: "José da Silva",
            categoria: "",

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
        nome: '400px',
        sexo: '',
        categoria: '',
        idade: '',
        dataRegistro: '',
        status: '',
        button: ''
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

    const headerTableRegister = {
        number: "Nº",
        name: "Competidor",
        horse: "Cavalo",
        button: " "
    }

    const columnsHeightTableRegister = {
        number: "",
        name: "400px",
        horse: "400px",
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
                <GoPencil size={20} />
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
                <GoPencil size={20} />
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
                    <CategoryMenu>
                        <div>
                            <Input
                                title={"Status Categoria"}
                                disabled
                                value={data.statusCategoria}
                                name="apelido"
                                onChange={handleChange}
                            />
                            <Button><GoPencil />Editar</Button>
                            <Button type={"submit"} onClick={consoleData}>
                                Salvar
                            </Button>
                        </div>
                        <Button className={"danger"}>Finalizar Evento</Button>
                    </CategoryMenu>

                    <MainForm>
                        <h1>Cadastro Evento</h1>

                        <Section title={"Dados Evento"} />

                        <Input
                            title={"Nome"}
                            name="nome"
                            value={data.nome}
                            onChange={handleChange}
                            mandatory
                            placeholder="Digite o nome do competidor"
                        />

                        <div className="flex">

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
                            </Date>

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
                            </Date>

                            <Select
                                label={"Prova"}
                                name="prova"
                                onChange={handleChange}
                                mandatory
                                className={"medium-width"}
                            >
                                <option value="mirim">3 Tambores</option>
                                <option value="juvenil">6 Balizas</option>
                                <option value="kids">Maneabilidade</option>
                            </Select>

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

                        </div>

                        <Table header={headerTableRegister} rows={rows} widths={columnsHeightTableRegister}></Table>
                    </MainForm>

                    <Status>
                        <Input
                            title={"Número único"}
                            value={data.id}
                            disabled
                            status
                        />
                        <Input
                            title={"Status Evento"}
                            value={"Ativo"}
                            disabled
                            status
                        />
                        <Input
                            title={"Competidores Evento"}
                            value={"01"}
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

                    <Table header={header} rows={rows} widths={larguras}></Table>
                </Listing>
            )}
        </Container>
    );
}
