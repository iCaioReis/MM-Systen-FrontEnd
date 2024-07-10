import { Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';
import { Cadastros } from '../pages/Cadastros';
import { CadastroCompetidor } from '../pages/CadastroCompetidores';

export function SupRoutes() {
    return (
        <Routes>
            <Route path='/' element={< DefaultLayout />}>
                <Route path='/' element={< Home />}/>
                <Route path='/cadastros' element={< Cadastros />}/>
                <Route path='/cadastros/competidores' element={< CadastroCompetidor />}/>
            </Route>
        </Routes>
    )
}