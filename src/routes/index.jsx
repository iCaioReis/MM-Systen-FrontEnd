import { BrowserRouter } from "react-router-dom";
import { SupRoutes } from "./sup.routes";

export function Routes(){
    return(
        <BrowserRouter>
            <SupRoutes/>
        </BrowserRouter>
    )
}