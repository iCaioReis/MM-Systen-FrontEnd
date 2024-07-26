import React, { useState } from 'react';

import { Container } from './styles';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { Table } from '../Table';

export function List({ title, categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const larguras = {
        competitor_order: "50px",
        competitor: "",
        horse: "",
        button: "30px"
    }
    const header = {
        competitor_order: "Ordem",
        competitor: "Competidor",
        horse: "Cavalo",
        button: ""
    }

    const competitor_horse_categorie = [
        {
            id: "1",
            state: "",
            competitor_order: "",
            time: "",
            competitor_id: "",
            horse_id: "",
        }
    ]

    return (
        <Container>
            <Modal isOpen={modalIsOpen} content={
                <div className="modal">
                    <div className="flex">
                        <h3>Prova: </h3>
                        <h1>Maneabilidade</h1>
                        <h3>Categoria:</h3>
                        <h1>Kids</h1>
                    </div>

                    <Button
                        className="noBackground auto-width exit"
                        onClick={toggleModal}
                    >X</Button>

                    <div className="flex">
                        <Input title={"Competidor"} ></Input>
                        <Input title={"Cavalo"} ></Input>
                        <Button>Salvar</Button>
                    </div>

                    <Table
                        header={header} 
                        widths={larguras}

                    ></Table>
                </div>
            } />

            <Button onClick={toggleDropdown}>
                {title}
            </Button>
            {isOpen && (
                <ul className="category-list">
                    <li className="category-header">
                        <span>Categoria</span>
                        <span>Status</span>
                        <span>Competidores</span>
                    </li>
                    {categories.map((category, index) => (
                        <li key={index} className="category-item" onClick={toggleModal}>
                            <span>{category.name}</span>
                            <span>{category.status}</span>
                            <span>{category.competitors}</span>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};