import { FiAirplay } from "react-icons/fi";
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
        </Container>
    )
}