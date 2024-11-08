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
        gap: .5rem;

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

        &:hover {
            background-color: ${({ theme }) => theme.COLORS.THEME_700};
        }

        &.selected {
            background-color: ${({ theme }) => theme.COLORS.THEME_900};
        }
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

export const SubMenu = styled.div`
    button {
        background-color: transparent;
        width: 16rem;
        position: relative;
        z-index: 100 !important;

        border-style: none;
        border-radius: 8px;

        padding: .7rem 1.5rem;
        font-size: 1.3rem;
        color: #ffffff;

        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        &:hover {
            background-color: ${({ theme }) => theme.COLORS.THEME_700};
        }

        &.selected {
            background-color: ${({ theme }) => theme.COLORS.THEME_900};

            > svg {
                transform: rotate(90deg);
                transition: transform 0.5s ease;
            }
        }
    }

    @keyframes showMenu {
        from {top: -50px;}
        to {top: 0}
    }
            
     nav {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
     
     
        animation-name: showMenu;
        animation-duration: .5s;

        margin-top: .5rem;

        > a {
            margin-left: 3rem;
            white-space: nowrap;
            width: min-content;
            padding: .2rem 0 ;
            
            font-size: 1rem;
            border-bottom: 1px solid transparent;

            &:hover {
                background-color: transparent;
                border-bottom: 1px solid ${({ theme }) => theme.COLORS.LIGHT_100};
            }

            &.selected {
                background-color: transparent;
                border-bottom: 1px solid ${({ theme }) => theme.COLORS.LIGHT_100};
            }
       }
    }
`;