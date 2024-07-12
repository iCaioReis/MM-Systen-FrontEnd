import styled from "styled-components";

export const Container = styled.div`
    max-width: 1200px;
    max-height: 650px;
    margin: 3rem 1rem 0;
    padding: 1rem;

    display: grid;
    grid-template-columns: 15rem auto 10rem;
    grid-template-rows: auto;
    
    gap: 1rem;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_200};

    h1 {
        color: ${({ theme }) => theme.COLORS.THEME_700};
    }

    img {
        width: 15rem;
        height: 15rem;

        border-radius: 8px;

        object-fit: cover;
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

    .profile {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 4.2rem;

        > div {
            display: flex;
            flex-direction: column;
            gap: .5rem;
        }
    }

    .main-form{
        overflow-y: scroll;
        max-height: 580px;
    }

    @media(min-width: 1200px){
        margin: auto;
   }
`;

export const Date = styled.div`
    display: flex;
    align-items: end;
    gap: .5rem;
`;