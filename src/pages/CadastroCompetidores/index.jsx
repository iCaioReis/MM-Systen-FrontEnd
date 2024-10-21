import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { CompetitorListing } from "./CompetitorListing";
import { CompetitorForm } from "./CompetitorForm"

import { Container } from "./styles";

export function CadastroCompetidor() {
    const [activePage, setActivePage] = useState('cadastro');
    const [competitor, setCompetitor] = useState();
    const [refresh, setRefresh] = useState(false);

    const params = useParams();

    const handlePage = (page) => {
        setActivePage(page);
    };
    const handleRefresh = () => {
        setRefresh(prev => !prev)
    };
    
    useEffect(() => {
        if(params.id){
            async function fethCompetitor() {
                const res = await api.get(`/competitors/${params.id}`);
                setCompetitor(res.data.competitor);
            }
            fethCompetitor();
        }
    }, [refresh]);

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && ( 
                <CompetitorForm 
                    mode={params.id && "show"}
                    competitor={competitor}
                    refresh={handleRefresh}
                    
                />
            )}

            {activePage === 'listagem' && ( <CompetitorListing/> )}
        </Container>
    );
}