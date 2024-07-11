import { FiAirplay } from "react-icons/fi";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container } from "./styles";

export function CadastroCompetidor(){
    function imprimir(){
        alert("Deu certo")
    }
    return(
        <Container>
            <h1>Cadastro Competidor</h1>
            <Button onClick={imprimir}><FiAirplay/>Botão</Button>
            <Input title={"CPF"} dataType={"CPF"} mandatory placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"/>
            <Input title={"Nome"} data={"José da Silva Santos"} mandatory placeholder="Digite o nome do competidor"/>
            <Input title={"Nome"} data={"José da Silva Santos"} mandatory disabled placeholder="Digite o nome do competidor"/>
            

        </Container>
    )
}