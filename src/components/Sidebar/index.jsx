import { Link } from 'react-router-dom';

import { Container, UserSection } from './styles';

export function Sidebar(){
    return(
        <Container>
            <nav>
                <Link to={"/evento"}>Evento</Link>
                <Link to={"/financeiro"}>Financeiro</Link>
                <Link to={"/cadastro"}>Cadastro</Link>
            </nav>
            <UserSection>

            </UserSection>
        </Container>
    )
    
}