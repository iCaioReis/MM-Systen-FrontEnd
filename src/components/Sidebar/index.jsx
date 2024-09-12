import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/user.svg";

import { Container, UserSection, Profile } from './styles';

export function Sidebar(){
    const { signOut, user } = useAuth();

    const avatarUrl = user.picture ? `${api.defaults.baseURL}files/${user.picture}` : avatarPlaceholder;
    
    const navigation = useNavigate();

    function handleSignOut(){
        navigation("/")
        signOut();
    }

    return(
        <Container className='Sidebar'>
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
                    <strong>{user.login}</strong>
                </div>
                </Profile>

                <Link onClick={handleSignOut}>Sair</Link>
            </UserSection>
        </Container>
    )
    
}