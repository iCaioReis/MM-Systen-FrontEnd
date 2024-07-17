import { Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';
import { Cadastro } from '../pages/Cadastro';
import { CadastroCavalo } from '../pages/CadastroCavalo';
import { CadastroCompetidor } from '../pages/CadastroCompetidores';


export function SupRoutes() {
    return (
        <Routes>
            <Route path='/' element={< DefaultLayout />}>
                <Route path='/' element={< Home />}/>
                <Route path='/cadastro' element={< Cadastro />}/>
                <Route path='/cadastro/cavalo/' element={< CadastroCavalo />}/>
                <Route path='/cadastro/cavalo/:id' element={< CadastroCavalo />}/>
                <Route path='/cadastro/competidor/:id' element={< CadastroCompetidor />}/>
              
            </Route>
        </Routes>
    )
}