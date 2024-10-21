import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { UserForm } from './UserForm';
import { UserListing } from './UserListing';

import { Container } from './styles';

export function CadastroUsuario() {
    const params = useParams();

    const [activePage, setActivePage] = useState('cadastro');
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState();
    
    const handlePage = (page) => {
        setActivePage(page);
    };
    const handleRefresh = () => {
        setRefresh(prev => !prev)
    };

    useEffect(() => {
        if(params.id){
            async function fethUser() {
                const res = await api.get(`/users/${params.id}`);
                setUser(res.data.User);
            }
            fethUser();
        }
    }, [refresh]);

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && (
                <UserForm 
                    mode={params.id && "show"} 
                    user={user} 
                    refresh={handleRefresh}
                />)
            }

            {activePage === 'listagem' && (<UserListing/>)}
        </Container>
    ); 
}
