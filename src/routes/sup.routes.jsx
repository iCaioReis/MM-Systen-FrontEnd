import { Routes, Route } from 'react-router-dom';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { Layout } from '../layouts/LayoutTest'

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
import { Results } from '../pages/Results';
import { PrintEvent } from '../pages/CadastroEvento/PrintEvent';
import { PrintEventHorsesWithChip } from '../pages/CadastroEvento/PrintEventHorsesWithChip';
import { PrintAllResults } from '../pages/Results/PrintAllResults'
import { PrintWinners } from '../pages/Results/PrintWinners'

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
                <Route path='/evento/juiz/:id' element={<EventJudge/>}/>
                <Route path='/evento/results/' element={<Results/>}></Route> 
                <Route path='/evento/results/:id' element={<Results/>}></Route>
            </Route>

            <Route path='/evento/impressao/:id' element={<PrintEvent/>}></Route>
            <Route path='/evento/impressaoCavalos/:id' element={<PrintEventHorsesWithChip/>}></Route>

            <Route path='/resultados/impressao/:id' element={<PrintAllResults/>}></Route>
            <Route path='/resultados/impressao/vencedores/:id' element={<PrintWinners/>}></Route>

            <Route path='/evento/juiz/competition/:id' element={<Competition/>}/>

            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    )
}