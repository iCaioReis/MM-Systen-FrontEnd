import { BrowserRouter } from "react-router-dom";

import { SupRoutes } from "./sup.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes(){
    return(
        <BrowserRouter>
            <AuthRoutes/>
        </BrowserRouter>
    )
}