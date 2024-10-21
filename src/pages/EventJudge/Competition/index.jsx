import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import screenfull from 'screenfull';

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { api } from '../../../services/api';

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import { FormatCategory, FormatProof, FormatStatus, FormatTimer } from "../../../utils/formatDatas";

import { Container, Content, JudgeArea, Profile, Actions, Main, Picture, Title, Timer, InputFouls, EliminatoryFouls, HiddenCheckbox, StyledLabel } from "./styles";

export function Competition() {
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [hasExecuted, setHasExecuted] = useState(false);
    const [categoryData, setCategoryData] = useState(null);
    const [competingRegisterNumber, setCompetingRegisterNumber] = useState();
    const [competingRegisterData, setCompetingRegisterData] = useState();

    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const resCompetitors = await api.get(`/categoryRegisters/${params.id}`);
                setCategoryData(resCompetitors.data);

                let lastCompetitor = resCompetitors.data.competitorHorses.findIndex(competitor => competitor.time === null);

                lastCompetitor == -1 ? lastCompetitor = 0 : lastCompetitor = lastCompetitor;

                let runningCompetitor = resCompetitors.data.competitorHorses.findIndex(competitor => competitor.state === "running");

                runningCompetitor != -1 ? lastCompetitor = runningCompetitor : lastCompetitor = lastCompetitor;

                if (!hasExecuted) {
                    setCompetingRegisterNumber(lastCompetitor);
                    setHasExecuted(true);
                    setRefresh(prev => !prev);
                }
            } catch (error) {
                toast.error(`Failed to fetch data: ${error.message}`);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (categoryData != null) {
            async function fetchData() {
                try {
                    const result = await api.get(`/categoryRegisters/${params.id}`);
                    const finishedCompetitors = result.data.competitorHorses.filter(competitor => competitor.state == "finished").length;
                    if (finishedCompetitors == categoryData.competitorHorses.length) {
                        await api.put(`/categories/${params.id}`, { state: "finished" });
                    }

                    const competitor = await api.get(`/registersJudge/${categoryData.competitorHorses[competingRegisterNumber].id}`);
                    setCompetingRegisterData(competitor.data.register);
                    console.log(competitor.data.register)
                    setLoading(false);
                } catch (error) {
                    toast.error(`Failed to fetch data: ${error.message}`);
                }
            }
            fetchData();
        }
    }, [refresh, competingRegisterNumber]);
      
    const handleNextCompetitor = () => {
        if ((competingRegisterNumber + 1) == categoryData.competitorHorses.length) { return };
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            fouls: "",
            time: "",
            SAT: false,
            NCP: false
        }));
        const next = competingRegisterNumber + 1;
        setCompetingRegisterNumber(next);
        setRefresh(prev => !prev);
    };
    const handlePreviousCompetitor = () => {
        if (competingRegisterNumber == 0) { return }
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            fouls: "",
            time: "",
            SAT: false,
            NCP: false
        }));
        const next = competingRegisterNumber - 1
        setCompetingRegisterNumber(next)
        setRefresh(prev => !prev);
    };
    const handleFinish = () => {
        competingRegisterData.state = "finished";
        async function putTimeAndState() {
            try {
                await api.put(`/registersJudge/${competingRegisterData.id}`, competingRegisterData)
                setRefresh(prev => !prev)
            } catch (error) {
                toast.error(`Erro ao tentar salvar: ${error}`);
            }
        }
        putTimeAndState();
    };
    const handleRegisterState = (state) => {
        async function handleState() {
            try {
                await api.put(`/registersJudge/${competingRegisterData.id}`, {
                    state: state
                });
                await api.put(`/categories/${params.id}`, { state: "running" });

            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage);
            }
        }
        handleState();
        setRefresh(prev => !prev);
    };
    const setFullScreen = () => {
        screenfull.request();
    };
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        console.log( `${parseFloat(competingRegisterData.time) + parseFloat(competingRegisterData.fouls) * 5}`)

        if (!value || value < 0) {
            value = 0
        }

        setCompetingRegisterData((prevData) => ({
            ...prevData,
            [name]: name === 'fouls' ? parseInt(value, 10) : value
        }));
    };
    const handleButtonAddFoul = (qut) => {
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            fouls: prevData.fouls + qut
        }));
    };
    const handleButtonDecrementFoul = () => {
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            fouls: prevData.fouls > 0 ? prevData.fouls - 1 : 0
        }));
    };
    const handleSatFoul = () => {
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            time: '000.000',
            fouls: 0,
            SAT: !prevData.SAT
        }));
    };
    const handleNcpFoul = () => {
        setCompetingRegisterData((prevData) => ({
            ...prevData,
            time: "000.000",
            fouls: 0,
            NCP: !prevData.NCP
        }));

    };

    if (loading) {
        return (
            <Container>
                <h1>Carregando...</h1>
                <ToastContainer/>
            </Container>
        )
    }

    return (
        <Container>
            <div className="zone"></div>
            <Content>
                <Profile>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">{competingRegisterData.horse_surname}</label>
                    </Picture>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">{competingRegisterData.competitor_surname || ""}</label>
                    </Picture>
                </Profile>

                <Main>
                    <Title className="title">
                        <h1>{competingRegisterData.event_name}</h1>
                        <span>{FormatProof(categoryData.status.proof_name)}</span>
                        <span> - </span>
                        <span>{FormatCategory(categoryData.status.categorie_name)}</span>
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

                    <JudgeArea>
                        
                            <div className="header">
                                <div className="flex timeAndFoul">
                                    <span>Tempo: </span>
                                    <Input
                                        onChange={handleInputChange}
                                        name="time"
                                        dataType="timer"
                                        type="text"
                                        className="inputTimer"
                                        value={competingRegisterData.time}
                                        disabled = {competingRegisterData.state != "running" || competingRegisterData.SAT || competingRegisterData.NCP ? true : false}
                                    />
                                    <span>Faltas: </span>

                                    <InputFouls>
                                        <button
                                            className='decrement'
                                            onClick={() => handleButtonDecrementFoul()}
                                            disabled = {competingRegisterData.state != "running" || competingRegisterData.SAT || competingRegisterData.NCP ? true : false}
                                        >-</button>
                                        <input
                                            type='number'
                                            min="0"
                                            minLength="0"
                                            onChange={handleInputChange}
                                            value={competingRegisterData.fouls}
                                            name="fouls"
                                            disabled = {competingRegisterData.state != "running" || competingRegisterData.SAT || competingRegisterData.NCP ? true : false}
                                        />
                                        <button 
                                            className='add'
                                            onClick={() => handleButtonAddFoul(1)}
                                            disabled = {competingRegisterData.state != "running" || competingRegisterData.SAT || competingRegisterData.NCP ? true : false}
                                        >+</button>
                                    </InputFouls>

                                </div>
                                <EliminatoryFouls>
                                    <HiddenCheckbox
                                        onChange={() => handleSatFoul()}
                                        id="SAT" 
                                        name="SAT"
                                        checked={competingRegisterData.SAT}
                                        disabled = {competingRegisterData.time == "___.___" ? false : competingRegisterData.NCP || competingRegisterData.fouls !=0 || competingRegisterData.time > "000.000" || competingRegisterData.state != "running"  ? true : false}                                     />
                                    <StyledLabel 
                                        htmlFor="SAT"
                                        disabled = {competingRegisterData.time == "___.___" ? false : competingRegisterData.NCP || competingRegisterData.fouls !=0 || competingRegisterData.time > "000.000" || competingRegisterData.state != "running"  ? true : false}                                    >SAT</StyledLabel>

                                    <HiddenCheckbox
                                        onChange={() => handleNcpFoul()}
                                        id="NCP"
                                        name="NCP"
                                        checked={competingRegisterData.NCP}
                                        disabled = {competingRegisterData.time == "___.___" ? false : competingRegisterData.SAT || competingRegisterData.fouls !=0 || competingRegisterData.time > "000.000" || competingRegisterData.state != "running"  ? true : false}
                                    />
                                    <StyledLabel
                                        htmlFor="NCP"
                                        disabled = { competingRegisterData.time == "___.___" ? false : competingRegisterData.SAT || competingRegisterData.fouls !=0 || competingRegisterData.time > "000.000" || competingRegisterData.state != "running" ? true : false}
                                    >NCP</StyledLabel>
                                </EliminatoryFouls>

                            </div>
                        
                    </JudgeArea>

                </Main>

                <Actions>
                    <Input
                        disabled
                        status
                        title={"Competidor"}
                        value={`${(competingRegisterNumber + 1)} de ${categoryData.competitorHorses.length}`}
                    />
                    <Input
                        disabled
                        status
                        title={"Status"}
                        value={FormatStatus(competingRegisterData.state)}
                    />
                    {competingRegisterNumber != 0 &&
                        competingRegisterData.state != "running" &&
                        <Button onClick={() => handlePreviousCompetitor()}><FaArrowLeft />Anterior</Button>
                    }
                    {competingRegisterNumber != (categoryData.competitorHorses.length - 1) &&
                        competingRegisterData.state != "running" &&
                        <Button onClick={() => handleNextCompetitor()}>Próximo<FaArrowRight /></Button>
                    }
                    {competingRegisterData.state == "running" &&
                        <Button onClick={handleFinish}>Finalizar</Button>
                    }
                    {competingRegisterData.state == "active" &&
                        <Button onClick={() => [handleRegisterState("running"), setFullScreen()]}>Iniciar</Button>
                    }
                    {competingRegisterData.state == "finished" &&
                        <Button className={"danger"} onClick={() => handleRegisterState("running")}>Reativar</Button>
                    }
                </Actions>
            </Content>

            <ToastContainer/>
        </Container>
    )
}