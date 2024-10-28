import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';

import logo from "/logo.png";

import { FormatCategory, FormatProof } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Container } from "./styles";

const header = {
    ID: "",
    horse_name: "",
    horse_chip: "",
    campNull1: "",
};

export function PrintEventHorsesWithChip() {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState();
    const [horses, setHorses] = useState([]);

    const params = useParams();

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";

        if (params.id) {
            async function fethEvent() {
                try {
                    const results = await api.get(`/results/${params.id}`);
                    setResults(results.data);
                    setLoading(false);
                    returnEventHorses(results.data.proofs);
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            fethEvent();
        }
    }, []);

    const returnEventHorses = (data) => {
        const Horses = []
        data.map((proof) => {
            proof.categories.map((categorie) => {
                categorie.competitors.map((competitor) => {
                    Horses.push(competitor)
                })
            })
        })

        const horsesFilter = (Horses.filter((item, index, self) =>
            index === self.findIndex((obj) => obj.horse_id === item.horse_id)
        )).sort((a, b) => {
            if (a.horse_name.toLowerCase() < b.horse_name.toLowerCase()) return -1;
            if (a.horse_name.toLowerCase() > b.horse_name.toLowerCase()) return 1;
            return 0;
        });

        setHorses(horsesFilter)
    }

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
                <div><h1>{results.name}</h1></div>
            </header>

            <div className='ProofCategoryContainer'>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td className='col1'>Nome do Animal</td>
                            <td className='col1'>Chip</td>
                            <td className='col1'>Observação</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            horses &&
                            horses.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.keys(header).map((field, subIndex) => {
                                            if (field == "ID") {
                                                return (
                                                    <td key={subIndex}>{row.horse_id}</td>
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
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </Container>
    );
}