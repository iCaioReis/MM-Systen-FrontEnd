import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormatCategory } from '../../../utils/formatDatas.js';
import { orderResults } from '../../../utils/orderResults.js';
import { filterEventCompetitors } from '../../../utils/filter.js';

import logo from "/logo.png";

import { api } from '../../../services/api.js';

import { Container } from "./styles";

const header = {
    competitor_iddd: "",
    competitor_name: "",
    competitor_category: "",
    horse_6b: "",
    seisbalizas_points: "",
    horse_3t: "",
    trestambores_points: "",
    horse_maneabilidade: "",
    maneabilidade_points: "",
    total_points: ""
};

function sortTable(columnIndex) {
    const table = document.getElementById("tableSumOfPoints");
    let rows = Array.from(table.rows).slice(1); // Pegando todas as linhas, exceto o cabeçalho
    let isAscending = table.getAttribute("data-sort-asc") === "true"; // Checa se já está em ordem ascendente
  
    rows.sort((rowA, rowB) => {
      let cellA = rowA.cells[columnIndex].innerText.toLowerCase();
      let cellB = rowB.cells[columnIndex].innerText.toLowerCase();
  
      if (!isNaN(cellA) && !isNaN(cellB)) { // Verifica se é número
        cellA = Number(cellA);
        cellB = Number(cellB);
      }
  
      if (cellA < cellB) return isAscending ? -1 : 1;
      if (cellA > cellB) return isAscending ? 1 : -1;
      return 0;
    });
  
    // Alterna entre ordem crescente e decrescente
    table.setAttribute("data-sort-asc", !isAscending);
  
    // Remonta o tbody com as linhas ordenadas
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
  }
  

export function PrintSumOfPoints() {
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState();
    const [proofs, setProofs] = useState([
        { name: 'seis_balizas', data: [] },
        { name: 'tres_tambores', data: [] },
        { name: 'maneabilidade', data: [] }
    ]);

    const params = useParams();

    useEffect(() => {
        document.body.style.backgroundColor = "#ffffff";

        if (params.id) {
            async function fethEvent() {
                try {
                    const results = await api.get(`/results/${params.id}`);

                    setCompetitors(filterEventCompetitors(results.data.proofs))

                    // Clonamos o objeto results para evitar mutações diretas
                    const sortedResults = { ...results.data };

                    orderResults(sortedResults)

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
                                    ? { ...prevProof, data: allCompetitorsInProof }
                                    : prevProof
                            )
                        );
                    })

                    // Atualiza o estado com os dados ordenados
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

    if (loading) {
        return (
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <Container className='content'>
            <header>
                <div><img src={logo} alt="" /></div>
                <div><h1>{results.name}</h1></div>
            </header>

            <div className='ProofCategoryContainer'>
                <table id='tableSumOfPoints'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td className='col1' onClick={() => sortTable(1)}>Nome do Competidor</td>
                            <td className='col3' onClick={() => sortTable(2)}>Categoria</td>
                            <td className='col1' onClick={() => sortTable(3)}>Cavalo</td>
                            <td className='col3' onClick={() => sortTable(4)}>Seis Balizas</td>
                            <td className='col1' onClick={() => sortTable(5)}>Cavalo</td>
                            <td className='col3' onClick={() => sortTable(6)}>Três Tambores</td>
                            <td className='col1' onClick={() => sortTable(7)}>Cavalo</td>
                            <td className='col3' onClick={() => sortTable(8)}>Maneabilidade</td>
                            <td className='col3' onClick={() => sortTable(9)}>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            competitors &&
                            competitors.map((row, index) => {
                                const dataCompetitor = {
                                    competitor_iddd: row.competitor_iddd,
                                    competitor_name: row.competitor_name,
                                    competitor_category: row.competitor_category,
                                    horse_6b: "-",
                                    seisbalizas_points: "-",
                                    horse_3t: "-",
                                    trestambores_points: "-",
                                    horse_maneabilidade: "-",
                                    maneabilidade_points: "-",
                                    total_points: 0
                                };

                                proofs.map((proof, index) => {
                                    const dataCompetitorInProof = proof.data.find((competitor) => competitor.competitor_iddd == row.competitor_iddd);

                                    if (dataCompetitorInProof){
                                        switch (index) {
                                            case 0:
                                                dataCompetitor.horse_6b = dataCompetitorInProof.horse_name
                                                dataCompetitor.seisbalizas_points = dataCompetitorInProof.points ? dataCompetitorInProof.points : dataCompetitorInProof.SAT ? "SAT" : "NCP";
                                                dataCompetitor.total_points += dataCompetitorInProof.points
                                                break;

                                            case 1:
                                                dataCompetitor.horse_3t = dataCompetitorInProof.horse_name
                                                dataCompetitor.trestambores_points = dataCompetitorInProof.points ? dataCompetitorInProof.points : dataCompetitorInProof.SAT ? "SAT" : "NCP";
                                                dataCompetitor.total_points += dataCompetitorInProof.points
                                                break;

                                            case 2:
                                                dataCompetitor.horse_maneabilidade = dataCompetitorInProof.horse_name
                                                dataCompetitor.maneabilidade_points = dataCompetitorInProof.points ? dataCompetitorInProof.points : dataCompetitorInProof.SAT ? "SAT" : "NCP";
                                                dataCompetitor.total_points += dataCompetitorInProof.points
                                                break;
                                            default:
                                                break;
                                        }
                                    }

                                })

                                return (
                                    <tr key={index}>
                                        
                                        {Object.keys(header).map((field, subIndex) => {
                                            if (field == "competitor_category") {
                                                return (
                                                    <td key={subIndex}>{FormatCategory(row.competitor_category)}</td>
                                                );
                                            }

                                            return (
                                                <td key={subIndex}>{dataCompetitor[field]}</td>
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