import React, { useState } from 'react';

import { FormatCategory, FormatStatus, FormatProof } from '../../../utils/formatDatas';

import { Container } from './styles';

import { Button } from '../../../components/Button';

export function List({ title, categories, refresh }) {
    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    function handleDetails(id) {
        window.open(`/evento/juiz/competition/${id}`, '_blank');
    }

    return (
        <Container>
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
                        <li key={index} className="category-item" onClick={() => handleDetails(category.id)}>
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