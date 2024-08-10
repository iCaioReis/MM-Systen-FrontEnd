import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/auth";

import avatarPlaceholder from "../../assets/user.svg";

import { Container, UserSection, Profile } from './styles';

export function Sidebar(){

    const avatarUrl = avatarPlaceholder;

    const { signOut } = useAuth();
    const navigation = useNavigate();

    function handleSignOut(){
        navigation("/")
        signOut();
    }

    return(
        <Container>
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/evento"}>Evento</Link>
                <Link to={"/financeiro"}>Financeiro</Link>
                <Link to={"/cadastro"}>Cadastro</Link>
            </nav>
            <UserSection>
                <Profile>
                <img src={avatarUrl} alt="Imagem do usuário" />

                <div>
                    <span>Seja Bem-vindo,</span>
                    <strong>Teste</strong>
                </div>
                </Profile>

                <Link onClick={handleSignOut}>Sair</Link>
            </UserSection>
        </Container>
    )
    
}