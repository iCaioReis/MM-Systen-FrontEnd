import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { EventFormm } from './EventForm';
import { EventListing } from './EventListing';

import { Container } from './styles';

export function EventJudge() {
    const params = useParams();

    const [activePage, setActivePage] = useState('evento');
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
                <button onClick={() => handlePage('evento')} className={activePage === 'evento' ? 'active' : ''}>Evento</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'evento' && 
                ( <EventFormm  mode={params.id && "show"} event={Event}/> )
            }

            {activePage === 'listagem' && ( <EventListing/>)}
        </Container>
    );
}
