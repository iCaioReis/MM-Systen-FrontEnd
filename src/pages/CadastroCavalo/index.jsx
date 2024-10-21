import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { HorseForm } from './HorseForm';
import { HorseListing } from './HorseListing';

import { Container } from './styles';

export function CadastroCavalo() {
    const [activePage, setActivePage] = useState('cadastro');
    const [refresh, setRefresh] = useState(false);
    const [horse, setHorse] = useState();

    const params = useParams();
    
    const handlePage = (page) => {
        setActivePage(page);
    };
    const handleRefresh = () => {
        setRefresh(prev => !prev)
    };

    useEffect(() => {
        if(params.id){
            async function fethHorse() {
                const res = await api.get(`/horses/${params.id}`);
                setHorse(res.data.horse);
            }
            fethHorse();
        }
    }, [refresh]);

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && 
            ( 
                <HorseForm  
                    mode={params.id && "show"} 
                    horse={horse}
                    refresh={handleRefresh}
                />
            )
            }

            {activePage === 'listagem' && ( <HorseListing/>)}
        </Container>
    );
}
