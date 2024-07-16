import styled from "styled-components";

export const Container = styled.div`

    .flex {
        margin-bottom: .5rem;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;    
    }
    > div {
        max-width: 1300px;
        height: 575px;
        margin: 0 1rem;
        padding: 1rem;

        border-radius: 8px;

        background-color: ${({ theme }) => theme.COLORS.LIGHT_200};
    }

    > nav {
        display: flex;
        gap: .2rem;

        margin: 1rem 3rem 0;
        
        > button {
            padding: .2rem .7rem;

            border: none;
            border-radius: 4px 4px 0 0;

            background-color: ${({ theme }) => theme.COLORS.LIGHT_400};

            &.active {
                background-color: ${({ theme }) => theme.COLORS.LIGHT_200};
            }
        }
    }

    @media(min-width: 1650px){
      margin: auto;
    }
`;

export const Form = styled.div`
    display: grid;
    grid-template-columns: 15rem auto 10rem;
    grid-template-rows: auto;
    
    gap: 1rem;
`;

export const MainForm = styled.div`
    overflow-y: scroll;

    > h1 {
        color: ${({ theme }) => theme.COLORS.THEME_700};
    }
`;

export const CategoryMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

export const Listing = styled.div`
    >.flex {
        margin: 0 6rem;
        align-items: end;

        margin-bottom: 1rem;
    }
`;