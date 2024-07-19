import { Link } from "react-router-dom";
import { Container } from "./styles";

export function NotFound() {
    return (
        <Container>
            <h1>ERROR 404</h1>
            <h2>Página indisponível</h2>
            <Link to="/">voltar para o início</Link>
        </Container>
    )
}