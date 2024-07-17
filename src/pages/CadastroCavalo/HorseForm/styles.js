import styled from "styled-components";

export const Form = styled.div`
    display: grid;
    grid-template-columns: 15rem auto 10rem;
    grid-template-rows: auto;
    
    gap: 1rem;
`;

export const MainForm = styled.div`
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

export const DateContainer = styled.div`
    display: flex;
    align-items: end;
    gap: .5rem;

    width: 450px;
`;