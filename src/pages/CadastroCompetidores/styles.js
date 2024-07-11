import styled from "styled-components";

export const Container = styled.div`
    margin: 3rem 1rem 0;
    padding: 1rem;

    display: grid;
    grid-template-columns: 15rem auto 10rem;
    gap: 1rem;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_200};

    h1 {
        color: ${({ theme }) => theme.COLORS.THEME_700};
    }

    > .status {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .flex {
        margin-bottom: .5rem;

        display: flex;
        gap: 1rem;    
    }
`;

export const Date = styled.div`
    display: flex;
    align-items: end;
    gap: .5rem;
`;