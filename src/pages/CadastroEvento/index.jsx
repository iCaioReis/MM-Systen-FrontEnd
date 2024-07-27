import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { EventFormm } from './EventForm/index.jsx';
import { EventListing } from './EventListing';

import { Container } from './styles';

export function CadastroEvento() {
    const params = useParams();

    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page);
    };
    
    const [Event, setEvent] = useState();

    useEffect(() => {
        if(params.id){
            async function fethEvent() {
                const res = await api.get(`/events/${params.id}`);
                setEvent(res.data);
            }
            fethEvent();
        }
    }, []);
    

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && 
                ( <EventFormm  mode={params.id && "show"} event={Event}/> )
            }

            {activePage === 'listagem' && ( <EventListing/>)}
        </Container>
    );
}
