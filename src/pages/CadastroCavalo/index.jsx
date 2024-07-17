import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { HorseForm } from './HorseForm';
import { HorseListing } from './HorseListing';

import { Container } from './styles';

export function CadastroCavalo() {
    const params = useParams();

    const [activePage, setActivePage] = useState('cadastro');
    const handlePage = (page) => {
        setActivePage(page); // Atualiza a página ativa com base no botão clicado
    };
    
    const [data, setData] = useState({
        id: "",
        state: "",
        cratedAt: "",
        surname: "",
        name: "",
        gender: "",
        registration: "",
        born: "",
        age: {},
        owner: "",
        march: ""
    });

    const horseTest = {
        id: "1",
        state: "Ativo",
        cratedAt: "16/05/2024",
        surname: "Cavalo",
        name: "Cavalo",
        gender: "",
        registration: "00112233",
        born: "2020-07-18",
        owner: "",
        march: ""
    };

    const [age, setAge] = useState();

    const handleDateBorn = (e) => {
        const idade = calcularIdade(e.target.value);
        setAge(idade)
    }

    

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && 
                ( <HorseForm  mode={params.id && "show"} horse={horseTest}/> )
            }

            {activePage === 'listagem' && ( <HorseListing/>)}
        </Container>
    );
}
