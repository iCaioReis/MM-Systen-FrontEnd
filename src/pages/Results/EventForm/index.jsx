import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus } from '../../../utils/formatDatas.js';
import { orderResults } from '../../../utils/orderResults.js';
import { generateExcelTable } from '../../../utils/generateExcelTable.js';

import { api } from '../../../services/api.js';

import { Input } from "../../../components/Input/index.jsx";
import { Button } from "../../../components/Button/index.jsx";
import { Select } from '../../../components/Select/index.jsx';
import { Table } from '../../../components/Table/index.jsx';

import { DateContainer, Form, MainForm, Profile, Picture } from './styles.js';

const initialData = {
    id: "",
    state: "active",
    created_at: "0000-00-00",
    name: "",
    start_date: "",
    end_date: "",
};
const larguras = {
    index: "40px",
    competitor: "",
    horse: "",
    time: "105px",
    foul: "70px",
    acress: "105px",
    totalTime: "105px",
    obs: ""
};
const header = {
    index: "N",
    competitor_name: "Competidor",
    horse_name: "Cavalo",
    time: "tempo",
    fouls: "Faltas",
    acress: "Acréssimo",
    totalTime: "Tempo total",
    obs: "Pontos"
};

export function EventFormm({ mode = "show" }) {
    const [data, setData] = useState(initialData);
    const [event, setEvent] = useState();
    const [results, setResults] = useState();
    const [proof, setProof] = useState(1);
    const [categorie, setCategorie] = useState(1);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    function handleResultsDatails(id) {
        window.open(`/resultados/impressao/${id}`, '_blank');
    }
    function handleWinnersDatails(id) {
        window.open(`/resultados/impressao/vencedores/${id}`, '_blank');
    }

    useEffect(() => {
        if (params.id) {
            async function fethEvent() {
                try {
                    const eventData = await api.get(`/events/${params.id}`);
                    const results = await api.get(`/results/${params.id}`);

                    // Clonamos o objeto results para evitar mutações diretas
                    const sortedResults = { ...results.data };
    
                    orderResults(sortedResults)
                
                    // Atualiza o estado com os dados ordenados
                    setEvent(eventData.data);
                    setResults(sortedResults);
                    setLoading(false);
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            fethEvent();
        }
    }, []);

    useEffect(() => {
        if (event && mode === 'show') {
            setData({ ...initialData, ...event });
        }
    }, [event]);

    if (loading) {
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    };

    const calculatePoints = (index) => {
        const tablePontis = [
            17,
             13,
             10,
             8,
             7,
             6,
             5,
             4,
             3,
             2
        ]
        const points = tablePontis[index] || 1
        return(points )
    }

    return (
        <Form>
            <Profile>
                <Picture>
                    <img src={avatarPlaceholder} alt="" />
                </Picture>
                <Input
                    title={"Número único"}
                    value={data.id}
                    disabled
                    status
                />
                <Input
                    title={"Status"}
                    value={FormatStatus(data.state)}
                    disabled
                    status
                />
                <Button onClick={() => handleResultsDatails(data.id)}>Imprimir Resultados</Button>
                <Button onClick={() => handleWinnersDatails(data.id)}>Imprimir Ganhadores</Button>
                <Button onClick={() => generateExcelTable(results)}>Exportar Excel</Button>
                
            </Profile>

            <MainForm>
                <h1>Resultados Evento</h1>

                <div className="flex">
                    <Input
                        title={"Nome do evento"}
                        name="name"
                        value={data.name}
                        disabled
                    />

                    <DateContainer className="date">
                        <Input
                            title={"Data início"}
                            name="start_date"
                            value={data.start_date}
                            type={"date"}
                            className={"input-larger-width"}
                            disabled
                        />

                        <FaArrowRight size={20} />

                        <Input
                            title={"Data fim"}
                            name="end_date"
                            value={data.end_date}
                            type={"date"}
                            className={"input-larger-width"}
                            disabled
                        />
                    </DateContainer>
                </div>

                <div className="flex">

                    <Select
                        label={"Prova"}
                        name="proof"
                        value={proof}
                        onChange={(e) => setProof(e.target.value)}
                        mandatory
                    >
                        <option value="1">Seis Balizas</option>
                        <option value="2">Três Tambores</option>
                        <option value="3">Maneabilidade</option>
                    </Select>

                    <Select
                        label={"Categoria"}
                        name="category"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                        mandatory
                    >
                        <option value="1">Kids</option>
                        <option value="2">Mirim</option>
                        <option value="3">Juvenil</option>
                        <option value="4">Iniciante</option>
                        <option value="5">Feminino</option>
                        <option value="6">Adulto</option>
                        <option value="7">Master</option>
                        <option value="8">Aberta</option>
                    </Select>
                </div>

                <div className="table">
                    <Table
                        header={header}
                        widths={larguras}
                        rows={
                            results.proofs[proof - 1].categories[categorie - 1].competitors
                                .map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {Object.keys(header).map((field, subIndex) => {
                                                if (field === "index") {
                                                    return (
                                                        <td key={subIndex}>
                                                            {index + 1}
                                                        </td>
                                                    );
                                                }

                                                if (field === "fouls") {
                                                    const data = row.fouls > 0 ? row.fouls : "-"
                                                    return (
                                                        <td key={subIndex}>
                                                            {data}
                                                        </td>
                                                    );
                                                }

                                                if (field === "acress") {
                                                    const data = row.fouls > 0 ? row.fouls * 5 + ".000 s" : "-"
                                                    return (
                                                        <td key={subIndex}>
                                                            {data}
                                                        </td>
                                                    );
                                                }
                                                if (field === "time") {
                                                    return (
                                                        <td key={subIndex}>
                                                            {row.time + " s"}
                                                        </td>
                                                    );
                                                }

                                                if (field === "totalTime") {
                                                    return (
                                                        <td key={subIndex}>
                                                            {row.total_time + " s"}
                                                        </td>
                                                    );
                                                }

                                                if (field === "obs") {
                                                    const obs = row.SAT ? "SAT" : row.NCP ? "NCP" : row.valid == false ? "Descartado" : calculatePoints(index);
                                                    return (
                                                        <td key={subIndex}>
                                                            {obs}
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <td key={subIndex}>{row[field]}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })
                        }
                    />
                </div>


            </MainForm>

            <ToastContainer />
        </Form>
    );
}
