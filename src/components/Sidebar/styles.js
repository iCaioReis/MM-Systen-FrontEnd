import styled from "styled-components";
import { Link } from 'react-router-dom';

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
    padding: 0 1.5rem;

    background-color: ${({ theme }) => theme.COLORS.THEME_900};

    display: flex;
    justify-content: space-between;
    align-items: center;

    > a {
        color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }
    
`;

export const Profile = styled(Link)`
    display: flex;
    align-items: center;
    gap: .5rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};

    > img {
        width: 3rem;
        height: 3rem;

        border-radius: 50%;
        
        object-fit: cover;
        
    }
    > div {
        display: flex;
        flex-direction: column;
    }
`;