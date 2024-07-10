import { PiRankingLight, PiHorse, PiCowboyHatLight } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

import { MenuButton } from '../../components/MenuButton';

import { Container } from './styles';

export function Cadastros(){
    return(
        <Container>
            <MenuButton title={"Competidores"} to={"/cadastros/competidores"} icon={<PiCowboyHatLight size={60}/>}/>
            <MenuButton title={"Cavalos"} to={"/financeiro"} icon={<PiHorse size={60}/>}/>
            <MenuButton title={"Eventos"} to={"/cadastros"}  icon={<PiRankingLight size={60}/>}/>
            <MenuButton title={"Usuários"} to={"/cadastros"}  icon={<FiUser size={60}/>}/>
        </Container>
    )
}