import { Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts/DefaultLayout';

import { Home } from '../pages/Home';
import { Cadastro } from '../pages/Cadastro';
import { NotFound } from '../pages/NotFound';
import { CadastroEvento } from '../pages/CadastroEvento';
import { CadastroCavalo } from '../pages/CadastroCavalo';
import { CadastroUsuario } from '../pages/CadastroUsuario';
import { CadastroCompetidor } from '../pages/CadastroCompetidores';

import { Event } from '../pages/Event';
import { EventJudge } from '../pages/EventJudge';
import { Competition } from '../pages/EventJudge/Competition';


export function SupRoutes() {
    return (
        <Routes>
            <Route path='/' element={< DefaultLayout />}>
                <Route path='/' element={< Home />}/>
                <Route path='/cadastro' element={< Cadastro />}/>
                <Route path='/cadastro/cavalo/' element={< CadastroCavalo />}/>
                <Route path='/cadastro/cavalo/:id' element={< CadastroCavalo />}/>
                <Route path='/cadastro/usuario/' element={< CadastroUsuario />}/>
                <Route path='/cadastro/usuario/:id' element={< CadastroUsuario />}/>
                <Route path='/cadastro/competidor/' element={< CadastroCompetidor />}/>
                <Route path='/cadastro/competidor/:id' element={< CadastroCompetidor />}/>
                <Route path='/cadastro/evento/' element={< CadastroEvento />}/>
                <Route path='/cadastro/evento/:id' element={< CadastroEvento />}/>

                <Route path='/evento' element={<Event/>}/>
                <Route path='/evento/juiz' element={<EventJudge/>}/>
            </Route>

            <Route path='/evento/juiz/competition/:id' element={<Competition/>}/>
            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    )
}