import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Input } from '../Input';
import { Container } from './styles';

export function SearchDropdown({ table, onItemSelected, clearSelection }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    useEffect(() => {
        if (clearSelection) {
            setSearch("");
            setSelectedItemId(null);
            setShowDropdown(false);
            setHighlightedIndex(-1);
        }
    }, [clearSelection]);

    useEffect(() => {
        if (search.length > 0) {
            async function fetchData() {
                const res = await api.get(`/${table}?name=${search}`);
                setData(res.data[table]);
                setShowDropdown(true);
                setHighlightedIndex(-1);
            }
            fetchData();
        } else {
            setData([]);
            setShowDropdown(false);
        }
    }, [search, table]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (showDropdown && data.length > 0) {
                if (event.key === 'ArrowDown') {
                    setHighlightedIndex(prevIndex => 
                        prevIndex < data.length - 1 ? prevIndex + 1 : 0
                    );
                } else if (event.key === 'ArrowUp') {
                    setHighlightedIndex(prevIndex => 
                        prevIndex > 0 ? prevIndex - 1 : data.length - 1
                    );
                } else if (event.key === 'Enter' && highlightedIndex >= 0) {
                    handleResultClick(data[highlightedIndex]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showDropdown, data, highlightedIndex]);

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleResultClick = (result) => {
        setSearch(result.name);
        setSelectedItemId(result.id);
        setShowDropdown(false);
        onItemSelected(result.id);
    };

    return (
        <Container>
            <Input
                title={table === "competitors" ? "Competidor" : "Cavalo"}
                type="text"
                value={search}
                onChange={handleChange}
            />
            {showDropdown && data.length > 0 && (
                <ul>
                    {data.map((result, index) => (
                        <li
                            key={index}
                            onClick={() => handleResultClick(result)}
                            style={{
                                padding: '8px',
                                cursor: 'pointer',
                                backgroundColor: highlightedIndex === index ? '#ddd' : 'transparent',
                            }}
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}
