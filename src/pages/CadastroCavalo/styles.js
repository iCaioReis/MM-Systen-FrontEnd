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

        margin: 2rem 3rem 0;
        
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