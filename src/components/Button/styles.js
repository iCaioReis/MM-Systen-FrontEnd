import styled from "styled-components";

export const Container = styled.button`
    
    padding: 1rem 2rem;

    border-style: none;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.THEME_900};

    
`;