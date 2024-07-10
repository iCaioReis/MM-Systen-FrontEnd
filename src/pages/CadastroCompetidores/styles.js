import styled from "styled-components";

export const Container = styled.div`
    margin: 3rem 1rem 0;
    padding: 1rem;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_200};
`;