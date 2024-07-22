import { GoPencil } from "react-icons/go";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api.js';

import { Listing } from './styles';

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Table } from '../../../components/Table';

const larguras = {
    id: "",
    name: "400px",
    gender: "",
    privilege: "",
    born: "",
    created_at: "",
    state: "",
    button: "80px"
}
const header = {
    id: "Nº",
    name: "Nome",
    gender: "Sexo",
    privilege: "Privilégio",
    born: "Ïdade",
    created_at: "Data Registro",
    state: "Status",
    button: ""
}

export function UserListing() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    function handleDetails(id) {
        navigate(`/cadastro/usuario/${id}`);
        window.location.reload();
    }

    function handleAdd() {
        navigate(`/cadastro/usuario`);
        window.location.reload();
    }

    function calculateDate(data) {
        const originalString = data;
        const [datePart] = originalString.split(' ');
        const [year, month, day] = datePart.split('-');

        const formattedDate = `${day}/${month}/${year}`;

        return(formattedDate);
    }

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
    }

    useEffect(() => {
        async function fethUsers() {
            const res = await api.get(`/users?name=${search}`);
            setUsers(res.data.Users);
        }
        fethUsers();
    }, [search])

    return (
        <Listing>
            <h1>Cadastro Usuário</h1>
            <div className="flex">
                <Button
                    onClick={handleAdd}
                    className={"larger-width"}
                >
                    Registrar usuário
                </Button>
                <Input
                    placeholder={"Pesquisar por nome"}
                    onChange={e => setSearch(e.target.value)}
                />
                <Input
                    title={"Registros"}
                    className={"input-small-width"}
                    status
                    value={users.length}
                    disabled
                />
            </div>

            <div className="listing-table-container">
                <Table
                    header={header}
                    widths={larguras}
                    rows={
                        users.map((row, index) => {
                            const id = row.id
                            return (
                                <tr key={index}>
                                    {Object.keys(header).map((field, subIndex) => {
                                        if (field == "gender") {
                                            return (
                                                <td key={subIndex}>

                                                    {row.gender == "male" ? "Masculino" : "Feminino"}
                                                </td>
                                            )
                                        }
                                        if (field == "privilege") {
                                            return (
                                                <td key={subIndex}>
                                                    {row.privilege == "sup" ? "SUP" : row.privilege == "judge" ? "Juiz" : row.privilege == "administrator" ? "Administrador" : "Usuário Comum"}
                                                </td>
                                            )
                                        }

                                        if (field == "state") {
                                            return (
                                                <td key={subIndex}>
                                                    {row.state == "active" ? "Ativo" : "Inativo"}
                                                </td>
                                            )
                                        }

                                        if (field == "born") {
                                            return (
                                                <td key={subIndex}>
                                                    {calculateAge(row.born)}
                                                </td>
                                            )
                                        }

                                        if (field == "created_at") {
                                            return (
                                                <td key={subIndex}>
                                                    {calculateDate(row.created_at)}
                                                </td>
                                            )
                                        }

                                        if (field == "button") {
                                            return (
                                                <td key={subIndex}>
                                                    <Button
                                                        className={"noBackground"}
                                                        onClick={() => handleDetails(id)}
                                                    >
                                                        <GoPencil size={20} />
                                                    </Button>
                                                </td>
                                            )
                                        }
                                        return (
                                            <td key={subIndex}>{row[field]}</td>
                                        )
                                    })}

                                </tr>
                            )
                        })
                    }
                />
            </div>
        </Listing>
    )
}

