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
    surname: "200px",
    name: "300px",
    gender: "",
    march: "",
    born: "",
    created_at: "",
    state: "",
    button: "",
}
const header = {
    id: "Nº",
    surname: "Apelido",
    name: "Nome",
    gender: "Sexo",
    march: "Marcha",
    born: "Ïdade",
    created_at: "Data Registro",
    state: "Status",
    button: ""
}

export function HorseListing() {
    const [search, setSearch] = useState("");
    const [horses, setHorses] = useState([]);

    const navigate = useNavigate();

    function handleDetails(id) {
        navigate(`/cadastro/cavalo/${id}`);
        window.location.reload();
    }

    function handleAdd() {
        navigate(`/cadastro/cavalo`);
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
        async function fethHorses() {
            const res = await api.get(`/horses?name=${search}`);
            setHorses(res.data.horses);
        }
        fethHorses();
    }, [search])


    return (
        <Listing>
            <h1>Cadastro Cavalo</h1>
            <div className="flex">
                <Button 
                    onClick={handleAdd}
                    className={"larger-width"}
                >
                    Registrar cavalo
                </Button>
                <Input
                    placeholder={"Pesquisar por nome"}
                    onChange={e => setSearch(e.target.value)}
                />
                <Input
                    title={"Registros"}
                    className={"input-small-width"}
                    status
                    value={horses.length}
                    disabled
                />
            </div>
            
            <div className="listing-table-container">
            <Table 
                header={header} 
                widths={larguras}
                rows={
                    horses.map((row, index) => {
                        const id = row.id
                        return(
                        <tr key={index}>
                            {Object.keys(header).map((field, subIndex) => {
                                if (field == "gender") {
                                    return (
                                        <td key={subIndex}>
                                            {row.gender == "castrated" ? "Castrado" : row.gender == "stallion" ? "Garanhão" : "Égua"}
                                        </td>
                                    )
                                }
                                if (field == "march") {
                                    return (
                                        <td key={subIndex}>
                                            {row.march == "beat" ? "Batida" : "Picada"}
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

                                if (field == "state") {
                                    return (
                                        <td key={subIndex}>
                                            {row.state == "active" ? "Ativo" : "Inativo"}
                                        </td>
                                    )
                                }
                                if (field == "button") {
                                    return (
                                        <td key={subIndex}>
                                            <Button 
                                                className={"noBackground"}
                                                onClick= {() => handleDetails(id)}
                                            >
                                                <GoPencil size={20}/>
                                            </Button>
                                        </td>
                                    )
                                }
                                return(
                                <td key={subIndex}>{row[field]}</td>
                                )})}

                        </tr>
                    )})
            }/>
            </div>
        </Listing>
    )
}

