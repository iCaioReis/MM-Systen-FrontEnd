import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { EventFormm } from './EventForm';
import { EventListing } from './EventListing';

import { Container } from './styles';

export function EventJudge() {
    const [activePage, setActivePage] = useState('evento');
    const [refresh, setRefresh] = useState();
    const [Event, setEvent] = useState();

    const params = useParams();
    
    const handlePage = (page) => {
        setActivePage(page);
    };
    const handleRefresh = () => {
        setRefresh(prev => !prev)
    };

    useEffect(() => {
        if(params.id){
            async function fethEvent() {
                const res = await api.get(`/competition/${params.id}`);
                setEvent(res.data);
            }
            fethEvent();
        }
    }, [refresh]);

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('evento')} className={activePage === 'evento' ? 'active' : ''}>Evento</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'evento' && 
                ( <EventFormm  mode={params.id && "show"} event={Event} refresh={handleRefresh}/> )
            }

            {activePage === 'listagem' && ( <EventListing/>)}
        </Container>
    );
}
