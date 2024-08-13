import styled from "styled-components";

export const Form = styled.div`
    display: grid;
    grid-template-columns: 12rem auto;
    grid-template-rows: auto;
    
    gap: 1rem;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
        
    > div {
        display: flex;
        flex-direction: column;
        gap: .5rem;


        img {
            width: 12rem;
            height: 12rem;

            border-radius: 8px;

            object-fit: cover;
        }
    }
`;

export const Picture = styled.div`
    position: relative;

    label {
    height: 2.5rem;
    width: 12rem;
    position: absolute;
    bottom: .3rem;

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

export const MainForm = styled.div`
`;

export const DateContainer = styled.div`
    display: flex;
    align-items: end;
    gap: .5rem;
    > svg {
        color: ${({ theme }) => theme.COLORS.THEME_700};
        margin: .5rem;
    }
`;