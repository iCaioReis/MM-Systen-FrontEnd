import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Input } from '../Input';
import { Container } from './styles';

export function SearchDropdown ({ table, onItemSelected }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        if (search.length > 0) {
            async function fetchData() {
                const res = await api.get(`/${table}?name=${search}`);
                setData(res.data[table]);
            }
            fetchData();
        } else {
            setData([]);
        }
    }, [search]);

    const handleChange = (event) => {
        setSearch(event.target.value);
        setShowDropdown(true);
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
                                cursor: 'pointer'
                            }}
                        >
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
};
