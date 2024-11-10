import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PiRankingLight, PiNotePencilLight, PiHouseLight } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from 'react';

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/user.svg";

import { Container, UserSection, Profile, SubMenu } from './styles';

export function Sidebar() {
    const location = useLocation();
    const currentUrl = location.pathname.substring(1);

    const [selectedPath, setSelectedPath] = useState(currentUrl);
    const { signOut, user } = useAuth();
    const [subMenuActive, setSubMenuActive] = useState(false);

    const avatarUrl = user.picture ? `${api.defaults.baseURL}files/${user.picture}` : avatarPlaceholder;

    const navigation = useNavigate();

    useEffect(() => {
        setSelectedPath(currentUrl);
    }, [currentUrl]);

    function handleSignOut() {
        navigation("/")
        signOut();
    }

    return (
        <Container className='Sidebar'>
            <nav>
                <SubMenu>
                    <Link to={"/"}
                        className={selectedPath === '' ? 'selected' : ''}
                    >
                        <button
                            className={subMenuActive == 'home' ? 'selected' : ''}
                            onClick={() => setSubMenuActive("home")}
                        >
                            <div>
                                <PiHouseLight />
                                Home
                            </div>

                        </button>
                    </Link>
                </SubMenu>

                <SubMenu>
                    <button
                        className={subMenuActive == 'evento' ? 'selected' : ''}
                        onClick={() => setSubMenuActive("evento")}
                    >
                        <div>
                            <PiRankingLight />
                            Evento
                        </div>

                        <IoIosArrowForward />
                    </button>
                    {
                        subMenuActive == "evento" &&

                        <div>
                            <nav>
                                <Link to={"/evento/juiz"}
                                    className={selectedPath === 'evento/juiz' ? 'selected' : ''}
                                >
                                    Tela Juiz
                                </Link>
                                <Link to={"/evento/telao"}
                                    target='_blank'
                                    className={selectedPath === 'evento/telao' ? 'selected' : ''}
                                >
                                    Telão
                                </Link>
                                <Link to={"/evento/results"}
                                    className={selectedPath === 'evento/results' ? 'selected' : ''}
                                >
                                    Resultados
                                </Link>
                            </nav>
                        </div>

                    }
                </SubMenu>

                <SubMenu>
                    <button
                        className={subMenuActive == 'cadastro' ? 'selected' : ''}
                        onClick={() => setSubMenuActive("cadastro")}
                    >
                        <div>
                            <PiNotePencilLight />
                            Cadastro
                        </div>
                        <IoIosArrowForward />
                    </button>
                    {
                        subMenuActive == "cadastro" &&

                        <div>
                            <nav>
                                <Link to={"/cadastro/competidor"}
                                    className={selectedPath === 'cadastro/competidor' ? 'selected' : ''}
                                >
                                    Competidor
                                </Link>
                                <Link to={"/cadastro/cavalo"}
                                    className={selectedPath === 'cadastro/cavalo' ? 'selected' : ''}
                                >
                                    Cavalo
                                </Link>
                                <Link to={"/cadastro/evento"}
                                    className={selectedPath === 'cadastro/evento' ? 'selected' : ''}
                                >
                                    Evento
                                </Link>
                                <Link to={"/cadastro/usuario"}
                                    className={selectedPath === 'cadastro/usuario' ? 'selected' : ''}
                                >
                                    Usuário
                                </Link>
                                {console.log(selectedPath)}
                            </nav>
                        </div>

                    }
                </SubMenu>
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