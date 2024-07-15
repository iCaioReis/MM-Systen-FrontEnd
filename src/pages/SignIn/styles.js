import styled from "styled-components";
import backgroundImg from "../../assets/backgroundLogin.png";

export const Container = styled.div`
    height: 100vh;

    display: flex;
    justify-content: space-around;
    align-items: center;

    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;

    div:nth-child(3){
        margin-top: -20px;
    }

    > img {
        width: 25rem;
        height: 25rem;
    }
`;

export const Form = styled.div`
    height: min-content;

    padding: 3.5rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_200};

    h1, a {
        color: ${({ theme }) => theme.COLORS.THEME_700};
    }
`;