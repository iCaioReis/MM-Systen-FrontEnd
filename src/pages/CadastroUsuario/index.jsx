import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api.js';

import { UserForm } from './UserForm';
import { UserListing } from './UserListing';

import { Container } from './styles';

export function CadastroUsuario() {
    const params = useParams();

    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page); // Atualiza a página ativa com base no botão clicado
    };

    const [user, setUser] = useState();
    const [users, setUsers] = useState({});

    useEffect(() => {
        async function fethUsers() {
            const res = await api.get(`/users`);
            setUsers(res.data.Users);
        }
        fethUsers();

        if(params.id){
            async function fethUser() {
                const res = await api.get(`/users/${params.id}`);
                setUser(res.data.User);
            }
            fethUser();
        }
    }, []);

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' &&
                (<UserForm mode={params.id && "show"} user={user} />)
            }

            {activePage === 'listagem' && (<UserListing users = {users}/>)}
        </Container>
    );
}
