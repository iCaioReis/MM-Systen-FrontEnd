import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormatStatus } from '../../../utils/formatDatas.js';
import { orderResults } from '../../../utils/orderResults.js';

import logo from "/logo.png";

import { FormatCategory, FormatProof } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Container } from "./styles";

const initialData = {
    id: "",
    state: "active",
    created_at: "0000-00-00",
    name: "",
    start_date: "",
    end_date: "",
};
const header = {
    classification: "",
    competitor_name: "",
    horse_name: "",
    time: "",
    fouls: "",
    total_time: "",
    points: ""
};

export function PrintAllResults() {
    const [data, setData] = useState(initialData);
    const [event, setEvent] = useState();
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [totalPassadas3t, setTotalPassadas3t] = useState(0);
    const [totalPassadas6b, setTotalPassadas6b] = useState(0);
    const [totalPassadasManeabilidade, setTotalPassadasManeabilidade] = useState(0);

    const params = useParams();

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
        return (points)
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";

        if (params.id) {
            async function fethEvent() {
                try {
                    const eventData = await api.get(`/events/${params.id}`);
                    const results = await api.get(`/results/${params.id}`);

                    let TotalPassadasManeabilidade = 0;
                    let TotalPassadas6b = 0;
                    let TotalPassadas3t = 0;

                    results.data.proofs.map((proof) => {
                        proof.categories.map((categorie) => {
                            categorie.competitors.map((competitor) => {
                                if (competitor.NCP == 0) {
                                    if (proof.name == "seis_balizas") {
                                        TotalPassadas6b++
                                        return
                                    }
                                    if (proof.name == "tres_tambores") {
                                        TotalPassadas3t++
                                        return
                                    }
                                    if (proof.name == "maneabilidade") {
                                        TotalPassadasManeabilidade++
                                        return
                                    }
                                }
                            })
                        })
                    })

                    setTotalPassadasManeabilidade(TotalPassadasManeabilidade);
                    setTotalPassadas6b(TotalPassadas6b);
                    setTotalPassadas3t(TotalPassadas3t);


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
        if (event) {
            setData({ ...initialData, ...event });
        }
    }, [event]);

    if (loading) {
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <Container className='content'>

            {results && results.proofs.map((prooff, prooffIndex) => {
                return (
                    <div className='data page-break' key={prooffIndex}>
                        <header className="print-header">
                            <div><img src={logo} alt="" /></div>
                            <div><h1>{data.name}</h1></div>
                        </header>

                        {prooff.categories.map((categoriee, categoryIndex) => {
                            return (
                                <div className='ProofCategoryContainer' key={categoryIndex}>
                                    <div className='ProofAndCategory'>
                                        <h2>Prova: <span>{FormatProof(prooff.name)}</span> </h2>
                                        <h2>Categoria: <span>{FormatCategory(categoriee.name)}</span></h2>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Classificação</td>
                                                <td className='col1'>Nome do Cavaleiro</td>
                                                <td className='col1'>Nome do Animal</td>
                                                <td className='col2'>Tempo Apurado</td>
                                                <td>Penalidades</td>
                                                <td className='col2'>Tempo total</td>
                                                <td className='col2'>Pontos</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoriee.competitors &&
                                                categoriee.competitors
                                                    .map((row, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                {Object.keys(header).map((field, subIndex) => {
                                                                    if (field === "points") {
                                                                        const obs = row.SAT ? "SAT" : row.NCP ? "NCP" : row.valid == false ? "Descartado" : calculatePoints(index);
                                                                        return (
                                                                            <td key={subIndex}>
                                                                                {obs}
                                                                            </td>
                                                                        );
                                                                    }
                                                                    if (field == "classification") {
                                                                        const obs = row.SAT ? "SAT" : row.NCP ? "NCP" : "Descartado"

                                                                        if (row.valid) {
                                                                            return (
                                                                                <td key={subIndex}>{index + 1 + " º"}</td>
                                                                            )
                                                                        }

                                                                        return (
                                                                            <td key={subIndex}>{obs}</td>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <td key={subIndex}>{row[field]}</td>
                                                                    );
                                                                })}
                                                            </tr>
                                                        );
                                                    })}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })}
                        <br />
                    </div>
                )
            })}

            {results &&
                <table>
                    <thead>
                        <tr>
                            <td width={200}>Prova</td>
                            <td width={400}>Total de passadas válidas</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Seis Balizas</td>
                            <td>{totalPassadas6b + " Passadas válidas"}</td>
                        </tr>
                        <tr>
                            <td>Três tambores</td>
                            <td>{totalPassadas3t + " Passadas válidas"}</td>
                        </tr>
                        <tr>
                            <td>Maneabilidade</td>
                            <td>{totalPassadasManeabilidade + " Passadas válidas"}</td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='red'>TODAS AS PASSADAS, EXCETO AS NPC</td>
                        </tr>
                    </tbody>

                </table>
            }

            <ToastContainer />
        </Container>
    );
}