import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus } from '../../../utils/formatDatas.js';
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
    index:"40px",
    competitor: "",
    horse: "",
    time: "",
    foul: "75px",
    acress: "100px",
    totalTime: "100px",
    SAT: "60px",
    NPC: "60px"
}
const header = {
    index:"N",
    competitor_name: "Competidor",
    horse_name: "Cavalo",
    time: "tempo",
    foul: "Faltas",
    acress: "Acréssimo",
    totalTime: "Tempo total",
    SAT: "SAT",
    NPC: "NPC"
}

export function EventFormm({ mode = "show" }) {
    const [data, setData] = useState(initialData);
    const [event, setEvent] = useState();
    const [results, setResults] = useState();
    const [proof, setProof] = useState(1);
    const [categorie, setCategorie] = useState(1);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(params.id){
            async function fethEvent() {
                const eventData = await api.get(`/events/${params.id}`);
                const results = await api.get(`/results/${params.id}`);
                setEvent(eventData.data);
                setResults(results.data);
                setLoading(false)
            }
            fethEvent();
        }
    }, [refresh]);

    useEffect(() => {
        if (event && mode === 'show') {
            setData({ ...initialData, ...event });
        }
    }, [event]);

    if(loading){
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
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

                <Table 
                header={header} 
                widths={larguras}
                rows = {
                    results.proofs[proof - 1].categories[categorie - 1].competitors
                        .sort((a, b) => {
                            // Remover espaços, underscores, e a unidade 's' do tempo
                            const timeA = parseFloat(a.time.replace(/[\s_]/g, '').replace('s', '')) || Infinity;
                            const timeB = parseFloat(b.time.replace(/[\s_]/g, '').replace('s', '')) || Infinity;
                            return timeA - timeB;
                        })
                        .map((row, index) => {
                            const id = row.id;
                            return (
                                <tr key={index}>
                                    {Object.keys(header).map((field, subIndex) => {
                                        if (field == "index") {
                                            return (
                                                <td key={subIndex}>
                                                    {index + 1}
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

            </MainForm>
        </Form>
    );
}
