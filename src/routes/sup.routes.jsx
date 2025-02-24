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
import { ScoreboardCompetition } from '../pages/EventJudge/scoreboardCompetition';
import { Results } from '../pages/Results';
import { PrintEvent } from '../pages/CadastroEvento/PrintEvent';
import { PrintEventHorsesWithChip } from '../pages/CadastroEvento/PrintEventHorsesWithChip';
import { PrintEventCompetitors } from '../pages/CadastroEvento/PrintEventCompetitors';
import { PrintAllResults } from '../pages/Results/PrintAllResults';
import { PrintProofsResult } from '../pages/Results/PrintProofsResult';
import { PrintWinners } from '../pages/Results/PrintWinners';
import { PrintSumOfPoints } from '../pages/Results/PrintSumOfPoints';

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
            <Route path='/evento/impressaoCompetidores/:id' element={<PrintEventCompetitors/>}></Route>

            <Route path='/resultados/impressao/:id' element={<PrintAllResults/>}></Route>
            <Route path='/resultados/impressao/vencedores/:id' element={<PrintWinners/>}></Route>
            <Route path='/resultados/impressao/classificacao-geral/:id' element={<PrintProofsResult/>}></Route>
            <Route path='/resultados/impressao/somatorio-de-pontos/:id' element={<PrintSumOfPoints/>}></Route>

            <Route path='/evento/juiz/competition/:id' element={<Competition/>}/>
            <Route path='/evento/telao' element={<ScoreboardCompetition/>}/>

            <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
    )
}