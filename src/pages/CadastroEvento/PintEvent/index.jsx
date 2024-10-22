import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";

import logo from "/logo.png";

import { FormatStatus, FormatCategory, FormatProof } from '../../../utils/formatDatas.js';
import { generateExcelTable } from '../../../utils/generateExcelTable.js';

import { api } from '../../../services/api.js';

import { Input } from "../../../components/Input/index.jsx";
import { Button } from "../../../components/Button/index.jsx";
import { Select } from '../../../components/Select/index.jsx';
import { Table } from '../../../components/Table/index.jsx';

import { Container } from "./styles";

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
    time: "",
    foul: "75px",
    acress: "100px",
    totalTime: "100px",
    SAT: "60px",
    NPC: "60px"
};
const header = {
    competitor_order: "N",
    competitor_name: "Competidor",
    horse_name: "Cavalo",
    campNull1: "",
    campNull2: "",
    campNull3: "",
    campNull4: "",
};

export function PrintEvent() {
    const [data, setData] = useState(initialData);
    const [event, setEvent] = useState();
    const [results, setResults] = useState();
    const [proof, setProof] = useState(1);
    const [categorie, setCategorie] = useState(1);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            async function fethEvent() {
                try {
                    const eventData = await api.get(`/events/${params.id}`);
                    const results = await api.get(`/results/${params.id}`);

                    // Clonamos o objeto results para evitar mutações diretas
                    const sortedResults = { ...results.data };

                    // Ordenar os competidores da prova e categoria selecionadas
                    sortedResults.proofs[proof - 1].categories[categorie - 1].competitors.sort((a, b) => {
                        const acressA = a.fouls > 0 ? a.fouls * 5 : 0;
                        const totalTimeA = parseFloat(a.time) + acressA;

                        const acressB = b.fouls > 0 ? b.fouls * 5 : 0;
                        const totalTimeB = parseFloat(b.time) + acressB;

                        return totalTimeA - totalTimeB;
                    });

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
        <Container>
            <header>
                <div><img src={logo} alt="" /></div>
                <div><h1>{data.name}</h1></div>
            </header>


            {
                results && results.proofs.map((prooff) => {
                    return (
                        <div>
                            {prooff.categories.map((categoriee) => {
                                return (
                                    <div className='ProofCategoryContainer'>
                                        <div className='ProofAndCategory'>
                                            <h2>Prova: <span>{FormatProof(prooff.name)}</span> </h2>
                                            <h2>Categoria: <span>{FormatCategory(categoriee.name)}</span></h2>
                                        </div>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>N</td>
                                                    <td className='col1'>Nome do Cavaleiro</td>
                                                    <td className='col1'>Nome do Animal</td>
                                                    <td>Marcha</td>
                                                    <td className='col2'>Tempo Apurado</td>
                                                    <td>Penalidades</td>
                                                    <td className='col2'>Tempo total</td>
                                                    <td>Classificação</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    categoriee.competitors && categoriee.competitors
                                                        .map((row, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {Object.keys(header).map((field, subIndex) => {
                                                                        return (
                                                                            <td key={subIndex}>{row[field]}</td>
                                                                        );
                                                                    })}
                                                                </tr>
                                                            );
                                                        })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}

                        </div>
                    )
                })
            }
            <ToastContainer />
        </Container>
    );
}