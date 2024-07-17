import { useState, useEffect } from 'react';

import { HorseForm } from './HorseForm';
import { HorseListing } from './HorseListing';

import { Container } from './styles';

export function CadastroCavalo() {
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

    useEffect(() => {
        const infoHorse = {
        };
        setData(infoHorse);
    }, []);

    const handleChange = (e, formattedValue) => {
        const { name } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: formattedValue !== undefined ? formattedValue : e.target.value,
        }));
    };
    const [age, setAge] = useState();

    const handleDateBorn = (e) => {
        const idade = calcularIdade(e.target.value);
        setAge(idade)
    }

    const calcularIdade = (date) => {
        const hoje = new Date();
        const nascimento = new Date(date);
    
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return(idade)
    }

    return (
        <Container>
            <nav>
                <button onClick={() => handlePage('cadastro')} className={activePage === 'cadastro' ? 'active' : ''}>Cadastro</button>
                <button onClick={() => handlePage('listagem')} className={activePage === 'listagem' ? 'active' : ''}>Listagem</button>
            </nav>

            {activePage === 'cadastro' && ( <HorseForm  mode="add"/> )}

            {activePage === 'listagem' && ( <HorseListing/>)}
        </Container>
    );
}
