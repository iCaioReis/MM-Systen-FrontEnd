import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    
    display: flex;
    align-items: center;
    justify-content: center;

    >.zone {
        width: 100%;
        height: 50vh;

        position: absolute;
        bottom: 0;
        z-index: -1;

        background-color: ${({ theme }) => theme.COLORS.LIGHT_100};
    }
`;

export const Content = styled.div`
    max-width: 1440px;
    height: 600px;

    display: grid;
    grid-template-columns: 15rem 35rem 15rem;
    grid-template-rows: auto;
    
    gap: 10rem;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5rem;
        
    > div {
        display: flex;
        flex-direction: column;
        gap: .5rem;

        img {
            width: 15rem;
            height: 15rem;

            border-radius: 8px;

            object-fit: cover;
        }
    }
`;

export const Picture = styled.div`
    position: relative;

    label {
    height: 3.5rem;
    width: 15rem;
    position: absolute;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    border-radius: 0 0 8px 8px;

    background-color: ${({ theme }) => theme.COLORS.THEME_700};
    input {
        display: none;
    }
}
`;

export const Main = styled.div`
    color: ${({ theme }) => theme.COLORS.THEME_900};
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.div`
    > h1 {
        font-family: 'poppins', serif;
        font-weight: 500;
        font-size: 2.5rem;
        line-height: 140%;
    }

    > span {
        font-family: 'poppins', serif;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 140%;
    }
`;

export const Timer = styled.div`
    margin: 0 auto;
    input {
        width: 30rem;
        height: 7.4rem;
        padding: 0 2rem;

        font-size: 80px;
        color: ${({ theme }) => theme.COLORS.LIGHT_100};

        border-radius: 1rem;
        border-style: none;

        background-color: ${({ theme }) => theme.COLORS.THEME_700};
    }
`;

export const Fouls = styled.div`
    height: 17rem;

    display: flex;
    flex-direction: column;
    gap: .5rem;

    text-align: left;
    
    > .header{
        display: flex;
        align-items: center;
        gap: 4px;
    }

    > .tabela {
        text-align: center;
        overflow-y: scroll;
    }
    table {
        color: ${({ theme }) => theme.COLORS.LIGHT_100}; 

        svg {
            color: ${({ theme }) => theme.COLORS.RED}; 
        }
    }
`;

export const Actions = styled.div`
    margin-bottom: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: .5rem;
`;