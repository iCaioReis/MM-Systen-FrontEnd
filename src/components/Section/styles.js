import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    margin: 1rem 0;

    color:  ${({ theme }) => theme.COLORS.THEME_700};

    div {
        width: 100%;
        height: 2px;

        margin: .3rem 0;

        background-color:  ${({ theme }) => theme.COLORS.LIGHT_300};
    }
    
`;