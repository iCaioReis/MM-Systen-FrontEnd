import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import screenfull from 'screenfull';

import { FaRegTrashCan } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { api } from '../../../services/api';

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Table } from '../../../components/Table';
import { Button } from "../../../components/Button";
import { Section } from "../../../components/Section";
import { ModalConfirm } from '../../../components/ModalConfirm';

import { FormatCategory, FormatProof, FormatStatus, FormatFouls } from "../../../utils/formatDatas";

import { Container, Content, Fouls, Profile, Actions, Main, Picture, Title, Timer } from "./styles";

const larguras = {
    name: "",
    amount: "150px",
    button: "30px"
}
const header = {
    name: "Falta",
    amount: "Acréssimo",
    button: ""
}

export function Competition() {
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState();
    const [competingRegisterNumber, setCompetingRegisterNumber] = useState(0)
    const [fouls, setFouls] = useState([{ id: "", name: "", amount: "" }]);
    const [refresh, setRefresh] = useState(false);
    const [hasExecuted, setHasExecuted] = useState(false);
    const [time, setTime] = useState("");
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
    const [registerToDelete, setRegisterToDelete] = useState({ id: "", horse: "", competitor: "" });

    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const resCompetitors = await api.get(`/categoryRegisters/${params.id}`);
                let lastCompetitor = 0;
                if (resCompetitors.data.status.last_competitor) {
                    lastCompetitor = resCompetitors.data.status.last_competitor;
                }
                if (resCompetitors.data.status.last_competitor >= resCompetitors.data.competitorHorses.length) {
                    lastCompetitor = 0;
                }
                if (!hasExecuted) {
                    setCompetingRegisterNumber(lastCompetitor);
                    
                    setHasExecuted(true);
                    setRefresh(prev => !prev);
                }
                if(resCompetitors.data.competitorHorses[competingRegisterNumber].time){
                    setTime(resCompetitors.data.competitorHorses[competingRegisterNumber].time)
                }else{
                    setTime("");
                }
                setCategoryData(resCompetitors.data);
        
                const resFouls = await api.get(`/fouls/${resCompetitors.data.competitorHorses[competingRegisterNumber].id}`);
                setFouls(resFouls.data.fouls);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchData();
    }, [refresh]);
    

    const handleNextCompetitor = () => {
        if ((competingRegisterNumber + 1) == categoryData.competitorHorses.length) { return };
        const next = competingRegisterNumber + 1;
        setCompetingRegisterNumber(next);
        //console.log(categoryData.competitorHorses[competingRegisterNumber].time)
        setRefresh(prev => !prev);
    }
    const handlePreviousCompetitor = () => {
        if (competingRegisterNumber == 0) { return }
        const next = competingRegisterNumber - 1
        setCompetingRegisterNumber(next)
        setRefresh(prev => !prev)
    }
    const handleFouls = ({ foul, amount }) => {
        async function fetchData() {
            try {
                await api.post("/fouls", {
                    register_id: categoryData.competitorHorses[competingRegisterNumber].id,
                    name: foul,
                    amount: amount
                });
                setRefresh(prev => !prev)
            } catch (error) {
                alert("Erro ao processar falta")
            }
        }
        fetchData();
    }
    const handleFinish = () => {
        async function putTimeAndState() {
            try {
                if(!time){
                    throw new Error("Campo timer vazio!");
                }
                await api.put(`/registersJudge/${categoryData.competitorHorses[competingRegisterNumber].id}`, {
                    state: "finished",
                    time: time
                })
                setRefresh(prev => !prev)
            } catch (error) {
                alert(`Erro ao tentar salvar: ${error}`);
            }
        }
        putTimeAndState();
    }
    const handleModalConfirm = (register) => {
        setIsModalConfirmVisible(!isModalConfirmVisible);
        { register && setRegisterToDelete(register) }
    }
    const handleRegisterState = (state) => {
        async function handleState() {
            try {
                await api.put(`/registersJudge/${categoryData.competitorHorses[competingRegisterNumber].id}`, {
                    state: state
                });
              } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                alert(errorMessage);
              }
        }
        handleState();
        setRefresh(prev =>! prev);
    }
    async function deleteFoul() {
        try {
            await api.delete(`/fouls/${registerToDelete.id}`);
            alert("Falta excluída com sucesso!");
            handleModalConfirm();
            setRefresh(prev => !prev);
        } catch (error) {
            alert("Erro ao tentar excluir falta", error);
        }
    }
    const setFullScreen = () => {
        screenfull.request();
    }

    if(loading){
        return(
            <Container>
                <h1>Carregando...</h1>
            </Container>
        )
    }

    return (
        <Container>
            <ModalConfirm
                title={"Você têm certeza que deseja excluir a falta? "}
                subTitle={`Falta:`}
                visible={isModalConfirmVisible}
                onClose={handleModalConfirm}
                onConfirm={deleteFoul}
            />
            <div className="zone"></div>
            <Content>
                <Profile>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">{categoryData.competitorHorses[competingRegisterNumber].horse_name}</label>
                    </Picture>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">{categoryData.competitorHorses[competingRegisterNumber].competitor_name || ""}</label>
                    </Picture>
                </Profile>

                <Main>
                    <Title className="title">
                        <h1>Nome do Evento</h1>
                        <span>{FormatProof(categoryData.status.proof_name)}</span>
                        <span> - </span>
                        <span>{FormatCategory(categoryData.status.categorie_name)}</span>
                    </Title>

                    <Timer className="timer">
                        <Input 
                            dataType="timer"
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            disabled={categoryData.competitorHorses[competingRegisterNumber].state != "running" }
                        />
                    </Timer>

                    <Fouls className="fouls">
                        <Section title={"Faltas"} />


                        {categoryData.competitorHorses[competingRegisterNumber].state == "running" &&
                        <div className="header">
                            <Button onClick={() => handleFouls({ foul: 'foul', amount: 1 })}>Falta +5s</Button>
                            <Button onClick={() => handleFouls({ foul: 'foul', amount: 10 })}>10 faltas +50s</Button>
                            <Button onClick={() => handleFouls({ foul: 'SAT', amount: "NA" })} className={"danger"}>SAT</Button>
                            <Button onClick={() => handleFouls({ foul: 'NPC', amount: "NA" })} className={"danger"}>NPC</Button>
                        </div>
                        }

                        <div className="tabela">
                            <Table
                                header={header}
                                widths={larguras}
                                rows={
                                    fouls.map((row, index) => {
                                        const id = row.id
                                        return (
                                            <tr key={index}>
                                                {Object.keys(header).map((field, subIndex) => {
                                                    if (field == "name") {
                                                        return (
                                                            <td key={subIndex}>
                                                                {FormatFouls(row.name)}
                                                            </td>
                                                        )
                                                    }
                                                    if (field == "amount" && row.name == "foul") {
                                                        return (
                                                            <td key={subIndex}>
                                                                {row.amount * 5}
                                                            </td>
                                                        )
                                                    }
                                                    if (field == "button") {
                                                        return (
                                                            <td key={subIndex}>
                                                                <Button
                                                                    className={"noBackground auto-width"}
                                                                    onClick={() => handleModalConfirm(row)}
                                                                >
                                                                    <FaRegTrashCan />
                                                                </Button>
                                                            </td>
                                                        )
                                                    }
                                                    return (
                                                        <td key={subIndex}>{row[field]}</td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })
                                } />
                        </div>
                    </Fouls>

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
                        value={FormatStatus(categoryData.competitorHorses[competingRegisterNumber].state)}
                    />
                    {competingRegisterNumber != 0 &&
                        categoryData.competitorHorses[competingRegisterNumber].state != "running" &&
                        <Button onClick={() => handlePreviousCompetitor()}><FaArrowLeft/>Anterior</Button>
                    }
                    {competingRegisterNumber != (categoryData.competitorHorses.length - 1) &&
                        categoryData.competitorHorses[competingRegisterNumber].state != "running" &&
                        <Button onClick={() => handleNextCompetitor()}>Próximo<FaArrowRight/></Button>
                    }
                    {categoryData.competitorHorses[competingRegisterNumber].state == "running" && 
                        <Button onClick={handleFinish}>Finalizar</Button>
                    }
                    {categoryData.competitorHorses[competingRegisterNumber].state == "active" && 
                        <Button onClick={() => [handleRegisterState("running"), setFullScreen()]}>Iniciar</Button>
                    }
                    {categoryData.competitorHorses[competingRegisterNumber].state == "finished" && 
                        <Button className={"danger"} onClick={() => handleRegisterState("running")}>Reativar</Button>
                    }
                </Actions>
            </Content>
        </Container>
    )
}