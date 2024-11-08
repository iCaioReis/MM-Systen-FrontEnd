import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import logo from "/logo.png";

import { FormatCategory, FormatDate, calculateAge } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Container } from "./styles";

const header = {
    competitor_iddd: "",
    competitor_name: "",
    competitor_category: "",
    competitor_CPF: "",
    competitor_born: "",
    competitor_age: "",
    competitor_gender: "",
};

export function PrintEventCompetitors() {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState();
    const [competitors, setCompetitors] = useState([]);

    const params = useParams();

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";

        if (params.id) {
            async function fethEvent() {
                try {
                    const results = await api.get(`/results/${params.id}`);
                    setResults(results.data);
                    setLoading(false);
                    returnEventCompetitors(results.data.proofs);
                    console.log(results);
                } catch (error) {
                    const errorMessage = error.response?.data?.message || error.message;
                    toast.error(errorMessage);
                }
            }
            fethEvent();
        }
    }, []);

    const returnEventCompetitors = (data) => {
        const Competitors = []
        data.map((proof) => {
            proof.categories.map((categorie) => {
                categorie.competitors.map((competitor) => {
                    Competitors.push(competitor)
                })
            })
        })

        const order = ["kids", "little", "juvenile", "beginner", "female", "adult", "master", "open"];

        const competitorsFilter = (Competitors.filter((item, index, self) =>
            index === self.findIndex((obj) => obj.competitor_iddd === item.competitor_iddd)
        )).sort((a, b) => {
            if (a.competitor_name.toLowerCase() < b.competitor_name.toLowerCase()) return -1;
            if (a.competitor_name.toLowerCase() > b.competitor_name.toLowerCase()) return 1;
            return 0;
        }).sort((a, b) => {
            return order.indexOf(a.competitor_category.toLowerCase()) - order.indexOf(b.competitor_category.toLowerCase());
        });

        setCompetitors(competitorsFilter)
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
                            <td className='col1'>Nome do Competidor</td>
                            <td className='col2'>Categoria</td>
                            <td className='col3'>CPF</td>
                            <td className='col2'>Data Nasc.</td>
                            <td className='col2'>Idade</td>
                            <td className='col2'>Sexo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            competitors &&
                            competitors.map((row, index) => {
                                return (
                                    <tr key={index}>
                                        {Object.keys(header).map((field, subIndex) => {
                                            if (field == "competitor_born") {
                                                return (
                                                    <td key={subIndex}>{FormatDate(row.competitor_born)}</td>
                                                );
                                            }
                                            if (field == "competitor_category") {
                                                return (
                                                    <td key={subIndex}>{FormatCategory(row.competitor_category)}</td>
                                                );
                                            }
                                            if (field == "competitor_gender") {
                                                return (
                                                    <td key={subIndex}>{row.competitor_gender == "male" ? "Masculino" : "Feminino"}</td>
                                                );
                                            }
                                            if (field == "competitor_age") {
                                                return (
                                                    <td key={subIndex}>{calculateAge(row.competitor_born) + " Anos"}</td>
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