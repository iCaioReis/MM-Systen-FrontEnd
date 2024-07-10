import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
    width: 15rem;
    height: 15rem;

    text-align: center;

    border-radius: 8px;
    border-style: none;
    background-color: ${({ theme }) => theme.COLORS.THEME_600};

    > svg {
        height: 10rem;

        color: ${({ theme }) => theme.COLORS.LIGHT_100};  
    }

    > .title {
        height: 5rem;

        border-radius: 0 0 8px 8px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: ${({ theme }) => theme.COLORS.LIGHT_100};

        background-color: ${({ theme }) => theme.COLORS.THEME_900};
    }
`;