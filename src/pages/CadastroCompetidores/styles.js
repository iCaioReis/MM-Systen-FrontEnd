import styled from "styled-components";

export const Container = styled.div`
    max-width: 1300px;
    max-height: 650px;
    margin: 3rem 1rem 0;
    padding: 1rem;

    display: grid;
    grid-template-columns: 15rem auto 10rem;
    grid-template-rows: auto;
    
    gap: 1rem;

    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_200};

    .flex {
        margin-bottom: .5rem;

        display: flex;
        gap: 1rem;    
    }

    @media(min-width: 1650px){
      margin: auto;
    }
`;

export const MainForm = styled.div`
    overflow-y: scroll;
    max-height: 575px;

    > h1 {
        color: ${({ theme }) => theme.COLORS.THEME_700};
    }
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
        
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

export const Status = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Date = styled.div`
    display: flex;
    align-items: end;
    gap: .5rem;
`;