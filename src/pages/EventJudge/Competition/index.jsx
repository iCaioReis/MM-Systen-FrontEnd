import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import avatarPlaceholder from "../../../assets/user.svg";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Select } from "../../../components/Select";
import { Section } from "../../../components/Section"

import { Container, Content, Fouls, Profile, Actions, Main, Picture, Title, Timer } from "./styles";

export function Competition() {
    return (
        <Container>
            <div className="zone"></div>
            <Content>
                <Profile>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">Apelido do Cavalo</label>
                    </Picture>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />

                        <label htmlFor="avatar">Apelido do Competidor</label>
                    </Picture>
                </Profile>

                <Main>

                    <Title className="title">
                        <h1>Nome do Evento</h1>
                        <span>Prova</span>
                        <span> - </span>
                        <span>Categoria</span>
                    </Title>

                    <Timer className="timer">
                        <input type="text" />
                    </Timer>

                    <Fouls className="fouls">
                    <Section title={"Faltas"}/>

                        <div className="header">
                            <Button>Falta +5s</Button>
                            <Button>10 faltas +50s</Button>
                            <Button className={"danger"}>SAT</Button>
                            <Button className={"danger"}>NPC</Button>
                        </div>
                        
                        <ul>
                            <li>Falta + 5 Segundos</li>
                            <li>10 Faltas + 50 Segundos</li>
                            <li>SAT</li>
                            <li>NPC</li>
                        </ul>
                    </Fouls>

                </Main>

                <Actions>
                    <Input disabled status title={"Competidor"} />
                    <Button><FaArrowLeft/>  Anterior</Button>
                    <Button>Próximo  <FaArrowRight/></Button>
                </Actions>
            </Content>
        </Container>
    )
}