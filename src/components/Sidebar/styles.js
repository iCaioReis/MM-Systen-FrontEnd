import styled from "styled-components";

export const Container = styled.div`
    width: 18rem;
    background-color: ${({ theme }) => theme.COLORS.THEME_600};

    display: grid;
    grid-template-rows: 1fr auto;

    > nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;

        a {
            color: #ffffff;
        }
    }
`;

export const UserSection = styled.div`

    width: 100%;
    height: 5rem;
    background-color: ${({ theme }) => theme.COLORS.THEME_900};
`;