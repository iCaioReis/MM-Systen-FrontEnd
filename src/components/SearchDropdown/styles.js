import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    position: relative;

    ul {

        margin: 2px 0;
        padding: 0;

        list-style: none;
        
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        
        background-color: ${({ theme }) => theme.COLORS.LIGHT_100};
        border-radius: 8px;
        max-height: 150px;
        overflow-y: auto;
        z-index: 1
        }
    
    
    li {
        color: ${({ theme }) => theme.COLORS.THEME_700};

        &:hover{
            cursor: pointer;
            background-color: ${({ theme }) => theme.COLORS.LIGHT_300} !important;
        }
    }
`;