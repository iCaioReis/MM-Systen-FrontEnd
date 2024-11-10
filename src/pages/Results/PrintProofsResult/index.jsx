import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { orderResults, orderByValidInvalidSatNcp } from '../../../utils/orderResults.js';

import logo from "/logo.png";

import { FormatProof } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Container } from "./styles";

const header = {
    classification: "",
    competitor_name: "",
    horse_name: "",
    time: "",
    fouls: "",
    total_time: ""
};



export function PrintProofsResult() {
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [proofs, setProofs] = useState([
        { name: 'seis_balizas', data: [] },
        { name: 'tres_tambores', data: [] },
        { name: 'maneabilidade', data: [] }
    ])
    const params = useParams();

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";

        if (params.id) {
            async function fethEvent() {
                try {
                    const results = await api.get(`/results/${params.id}`);

                    results.data.proofs.map((proof) => {
                        const allCompetitorsInProof = []

                        proof.categories.map((categorie) => {
                            categorie.competitors.map((competitor) => {
                                allCompetitorsInProof.push(competitor)
                            })
                        })

                        setProofs((prevProofs) =>
                            prevProofs.map((prevProof) =>
                                prevProof.name === proof.name
                                    ? { ...prevProof, data: orderByValidInvalidSatNcp(allCompetitorsInProof) }
                                    : prevProof
                            )
                        );
                    })
                    setResults(results.data);
                    setLoading(false);
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            fethEvent();
        }
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <Container className='content'>
            {proofs.map((proof, proofIndex) => {
                console.log(results)
                return (
                    <div className='data page-break' key={proofIndex}>
                        <header className="print-header">
                            <div><img src={logo} alt="" /></div>
                            <div><h1>{results.name}</h1></div>
                        </header>

                        <div className='ProofCategoryContainer'>
                            <div className='ProofAndCategory'>
                                <h2>Prova: <span>{FormatProof(proof.name)}</span> </h2>
                                <h2>Categoria: <span>Todas</span></h2>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {proof.data
                                        .map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    {Object.keys(header).map((field, subIndex) => {
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
                        <br />
                    </div>
                )
            })}
            <ToastContainer />
        </Container>
    );
}