import styled from "styled-components";

export const Form = styled.div`
    display: grid;
    grid-template-columns: 12rem auto 12rem;
    grid-template-rows: auto;
    
    gap: 1rem;
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

export const Status = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

export const CategoriesContainer = styled.div`
    max-height: 22rem;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: .2rem;

    border-radius: 8px;
`;