import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import { SupRoutes } from "./sup.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
    const { user } = useAuth();

    return(
        <BrowserRouter>
            { user ? <SupRoutes/> : <AuthRoutes/>}
        </BrowserRouter>
    )
}