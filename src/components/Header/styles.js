import styled from "styled-components";

export const HeaderContainer = styled.div`
    width: 100%;
    height: 4.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.THEME_700};
`;