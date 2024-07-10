import { Link } from 'react-router-dom';

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Container, UserSection, Profile } from './styles';

export function Sidebar(){

    const avatarUrl = avatarPlaceholder;
    return(
        <Container>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/evento"}>Evento</Link>
                <Link to={"/financeiro"}>Financeiro</Link>
                <Link to={"/cadastros"}>Cadastro</Link>
            </nav>
            <UserSection>
                <Profile>
                <img src={avatarUrl} alt="Imagem do usuário" />

                <div>
                    <span>Seja Bem-vindo,</span>
                    <strong>Teste</strong>
                </div>
                </Profile>

                <Link>Sair</Link>
            </UserSection>
        </Container>
    )
    
}