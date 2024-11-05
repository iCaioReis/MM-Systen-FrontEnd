import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

import screenfull from 'screenfull';

import { api } from '../../../services/api';

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import { FormatCategory, FormatProof, FormatTimer } from "../../../utils/formatDatas";

import { Container, Content, Profile, Actions, Main, Picture, Title, Timer, UpcomingCompetitorsTable, RankingCompetitorsTable } from "./styles";

export function ScoreboardCompetition() {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [competingRegisterNumber, setCompetingRegisterNumber] = useState();
    const [competingRegisterData, setCompetingRegisterData] = useState();
    const [competitorPicture, setCompetitorPicture] = useState(avatarPlaceholder);
    const [horsePicture, setHorsePicture] = useState(avatarPlaceholder);
    const [upcomingCompetitors, setUpcomingCompetitors] = useState([]);
    const [ranking, setRanking] = useState();

    const broadcast = new BroadcastChannel('placar-channel');

    useEffect(() => {
        if (competingRegisterData != null) {
            async function fetchData() {
                try {
                    const result = await api.get(`/categoryRegisters/${competingRegisterData.categorie_id}`);

                    const finishedCompetitions = result.data.competitorHorses.filter(horse => horse.state === 'finished');

                    const withTotalTime = finishedCompetitions
                        .map(horse => {
                            const totalTime = parseFloat(horse.time) + (horse.fouls * 5); // Calcula o tempo total

                            const totalTimeString = totalTime.toFixed(3);
                            const [integerPart, decimalPart] = totalTimeString.split('.');

                            // Preenche com zeros à esquerda o número inteiro
                            const formattedIntegerPart = integerPart.padStart(3, '0');
                            // Preenche com zeros à direita o número decimal, se necessário
                            const formattedDecimalPart = decimalPart.padEnd(3, '0');

                            // Junta as partes formatadas
                            const formatedTime = `${formattedIntegerPart}.${formattedDecimalPart}`;

                            return { ...horse, total_time: formatedTime };
                        })
                        .filter(horse => horse.total_time > 0); // Filtra os registros com total_time > 0

                    // Passo 3: Filtrar os menores tempos por competidor
                    const topRanking = withTotalTime.reduce((acc, curr) => {
                        const existing = acc.find(item => item.competitor_id === curr.competitor_id);
                        if (!existing || curr.total_time < existing.total_time) {
                            return acc.filter(item => item.competitor_id !== curr.competitor_id).concat(curr);
                        }
                        return acc;
                    }, []);

                    topRanking.sort((a, b) => a.total_time - b.total_time);

                    setRanking(topRanking.slice(0, 4))
                } catch (error) {
                    console.log(error)
                    toast.error(`Failed to fetch data: ${error.message}`);
                }
            }
            fetchData();
            handleUpcomingCompetitors();
        }
    }, [refresh]);

    useEffect(() => {
        broadcast.onmessage = (event) => {
            setCompetingRegisterData(event.data)

            const competitorAvatarUrl = event.data.competitor_picture ? `${api.defaults.baseURL}files/${event.data.competitor_picture}` : avatarPlaceholder;
            setCompetitorPicture(competitorAvatarUrl);

            const horseAvatarUrl = event.data.horse_picture ? `${api.defaults.baseURL}files/${event.data.horse_picture}` : avatarPlaceholder;
            setHorsePicture(horseAvatarUrl);

            setRefresh(prev => !prev)

            return () => {
                broadcast.close();
            };
        };

    }, []);

    useEffect(() => {
        if (competingRegisterData) {
            setLoading(false)
        }
    }, [competingRegisterData]);

    const handleUpcomingCompetitors = () => {
        if(categoryData){
            const competitors = categoryData.competitorHorses.slice(competingRegisterData.competitor_order , competingRegisterData.competitor_order + 3)
            setUpcomingCompetitors(competitors);
        }
    };

    if (loading) {
        return (
            <Container>
                <h1>Carregando...</h1>
                <ToastContainer />
            </Container>
        )
    };

    return (
        <Container>
            <div className="zone"></div>
            <Content>
                <Profile>
                    <Picture>
                        <img src={horsePicture} alt="" />

                        <label htmlFor="avatar">{competingRegisterData.horse_surname}</label>
                    </Picture>
                    <Picture>
                        <img src={competitorPicture} alt="" />

                        <label htmlFor="avatar">{competingRegisterData.competitor_surname || ""}</label>
                    </Picture>
                </Profile>

                <Main>
                    <Title className="title">
                        <h1>{competingRegisterData.event_name}</h1>
                        <span>{FormatProof(competingRegisterData.proof_name)}</span>
                        <span> - </span>
                        <span>{FormatCategory(competingRegisterData.category_name)}</span>
                        <br /> <br />
                        <span>{competingRegisterData.competitor_surname}</span>
                        <br />
                        <span> {competingRegisterData.horse_surname} </span>
                    </Title>

                    <Timer className="timer">
                        {competingRegisterData.fouls != 0 &&
                            <Input
                                className={"addition"}
                                type="text"
                                value={`+ ${competingRegisterData.fouls * 5} s`}
                                disabled={true}
                            />
                        }
                        <Input
                            dataType="timer"
                            type="text"
                            value={FormatTimer(parseFloat(competingRegisterData.time) + parseFloat(competingRegisterData.fouls) * 5)}
                            disabled={true}
                        />
                        <span className='s'>s</span>
                    </Timer>

                    {ranking && ranking.length > 0 &&
                        <RankingCompetitorsTable>
                            <h3>Ranking</h3>

                            <table>
                                <thead>
                                    <tr>
                                        <th>N</th>
                                        <th>Competidor</th>
                                        <th>Tempo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        ranking.map((register, index) => {
                                            const isDuplicateTime = ranking.some(
                                                (item, i) => i !== index && item.total_time === register.total_time
                                            );

                                            return (
                                                <tr key={index}>
                                                    <th>{index + 1 + "º"}</th>
                                                    <th>{register.competitor_surname}</th>
                                                    <th className={isDuplicateTime ? "bg_yellow" : ""}>{register.total_time}</th>
                                                </tr>
                                            )
                                        }
                                        )}
                                </tbody>
                            </table>
                        </RankingCompetitorsTable>
                    }
                </Main>

                <Actions>
                    <UpcomingCompetitorsTable>
                        <h3>Próximas chamadas</h3>

                        <table>
                            <tbody>
                                {
                                    upcomingCompetitors.map(register => {
                                        return (
                                            <tr>
                                                <th>{register.competitor_surname}</th>
                                                <th>{register.horse_surname}</th>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </UpcomingCompetitorsTable>
                </Actions>
            </Content>

            <ToastContainer />
        </Container>
    )
}