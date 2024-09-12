import { PiRankingLight, PiHorse, PiCowboyHatLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

import { MenuButton } from '../../components/MenuButton';

import { Container } from './styles';

export function Cadastro(){
    return(
        <Container className="Main">
            <MenuButton title={"Competidor"} to={"/cadastro/competidor"} icon={<PiCowboyHatLight size={60}/>}/>
            <MenuButton title={"Cavalo"} to={"/cadastro/cavalo"} icon={<PiHorse size={60}/>}/>
            <MenuButton title={"Evento"} to={"/cadastro/evento"}  icon={<PiRankingLight size={60}/>}/>
            <MenuButton title={"Usuário"} to={"/cadastro/usuario"}  icon={<FiUser size={60}/>}/>
        </Container>
    )
}