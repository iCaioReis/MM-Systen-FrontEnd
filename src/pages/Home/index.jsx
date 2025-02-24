import { PiRankingLight } from "react-icons/pi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineAttachMoney } from "react-icons/md";

import { MenuButton } from '../../components/MenuButton';

import { Container } from './styles';

export function Home(){
    return(
        <Container className="Main">
            <MenuButton title={"Evento"} to={"/evento"} icon={<PiRankingLight size={60}/>}/>
            <MenuButton title={"Cadastros"} to={"/cadastro"}  icon={<HiOutlinePencilSquare size={60}/>}/>
        </Container>
    )
}