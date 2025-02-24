import React, { useState } from 'react';

import { FormatCategory, FormatStatus, FormatProof } from '../../../utils/formatDatas';

import { Container } from './styles';

import { Button } from '../../../components/Button';
import { ModalCategory } from '../ModalCategory';

export function List({ title, categories, refresh }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCategory, setModalCategory] = useState();


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = (category) => {
        setModalCategory(category)
        setModalIsOpen(!modalIsOpen);

        if(modalIsOpen){
            refresh()
        }
    };

    return (
        <Container>
            <ModalCategory
                isOpen={modalIsOpen}
                onClose={toggleModal}
                category={modalCategory}
                proof={title}
            />

            <Button onClick={toggleDropdown}>
                {FormatProof(title)}
            </Button>
            {isOpen && (
                <ul className="category-list">
                    <li className="category-header">
                        <span>Categoria</span>
                        <span>Status</span>
                        <span>Competidores</span>
                    </li>
                    {categories.map((category, index) => (
                        <li key={index} className="category-item" onClick={() => toggleModal(category)}>
                            <span>{FormatCategory(category.name)}</span>
                            <span>{FormatStatus(category.state)}</span>
                            <span>{category.competitorCount}</span>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};