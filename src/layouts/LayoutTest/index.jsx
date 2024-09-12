import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

import { Container, Logo } from "./styles";

import logo from "../../../public/logo.png";

export function Layout() {
    return(
        <Container>
            <Logo>
              <img src={logo} alt="" />
            </Logo>
            <Sidebar/>
            <Outlet className="outlet"/>
        </Container>
    )
}