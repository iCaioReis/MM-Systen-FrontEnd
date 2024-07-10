import { HeaderContainer } from "./styles";

import logo from "../../assets/LOGO.png";

export function Header(){
    return(
        <HeaderContainer className="header">
            <img src={logo}/>
            <h1>MANGALARGA MARCHADOR</h1>
        </HeaderContainer>
    )
}