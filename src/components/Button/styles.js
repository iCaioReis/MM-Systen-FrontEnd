import styled from "styled-components";

export const Container = styled.button`
    width: 100%;
    
    padding: .7rem 1rem;

    border-style: none;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.THEME_900};

    
`;