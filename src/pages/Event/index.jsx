import { PiRankingLight, PiProjectorScreenLight } from "react-icons/pi";
import { GiWhistle } from "react-icons/gi";

import { MenuButton } from '../../components/MenuButton';

import { Container } from './styles';

export function Event(){
    return(
        <Container className="Main">
            <MenuButton title={"Tela Juiz"} to={"/evento/juiz"} icon={<GiWhistle size={60}/>}/>
            <MenuButton title={"Telão"} to={"/telao"} icon={<PiProjectorScreenLight size={60}/>}/>
            <MenuButton title={"Resultados"} to={"/evento/results"}  icon={<PiRankingLight size={60}/>}/>
        </Container>
    )
}