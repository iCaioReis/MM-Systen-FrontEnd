import { IoPlayOutline } from "react-icons/io5";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api.js';

import { FormatDate } from "../../../utils/formatDatas.js";

import { Listing } from './styles.js';

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Table } from '../../../components/Table';

const larguras = {
    id: "",
    name: "500px",
    start_date: "",
    end_date: "",
    state: "200px",
    button: "30px"
}
const header = {
    id: "Nº",
    name: "Nome",
    start_date: "Data de início",
    end_date: "Data de Fim",
    state: "Status",
    button: ""
}

export function EventListing() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    function handleDetails(id) {
        window.open(`/evento/juiz/competition/${id}`, '_blank');
    }

    useEffect(() => {
        async function fethEvents() {
            const res = await api.get(`/events?name=${search}`);
            setEvents(res.data.events);
        }
        fethEvents();
    }, [search])


    return (
        <Listing>
            <h1>Listagem Eventos</h1>
            <div className="flex">
                <Input
                    placeholder={"Pesquisar por nome"}
                    onChange={e => setSearch(e.target.value)}
                />
                <Input
                    title={"Registros"}
                    className={"input-small-width"}
                    status
                    value={events.length}
                    disabled
                />
            </div>
            
            <div className="listing-table-container">
            <Table 
                header={header} 
                widths={larguras}
                rows={
                    events.map((row, index) => {
                        const id = row.id
                        return(
                        <tr key={index}>
                            {Object.keys(header).map((field, subIndex) => {
                                if (field == "start_date") {
                                    return (
                                        <td key={subIndex}>
                                            {FormatDate(row.start_date)}
                                        </td>
                                    )
                                }
                                if (field == "end_date") {
                                    return (
                                        <td key={subIndex}>
                                            {FormatDate(row.end_date)}
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
                                                <IoPlayOutline size={20}/>
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

