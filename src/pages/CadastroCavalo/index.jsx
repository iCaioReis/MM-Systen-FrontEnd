import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { HorseForm } from './HorseForm';
import { HorseListing } from './HorseListing';

import { Container } from './styles';

export function CadastroCavalo() {
    const params = useParams();

    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page); // Atualiza a página ativa com base no botão clicado
    };
    
    const [horse, setHorse] = useState();

    useEffect(() => {
        if(params.id){
            async function fethHorse() {
                const res = await api.get(`/horses/${params.id}`);
                setHorse(res.data.horse);
            }
            fethHorse();
        }
    }, []);
    

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && 
                ( <HorseForm  mode={params.id && "show"} horse={horse}/> )
            }

            {activePage === 'listagem' && ( <HorseListing/>)}
        </Container>
    );
}
