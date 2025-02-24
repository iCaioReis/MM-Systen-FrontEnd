import styled from "styled-components";

export const Form = styled.div`
    display: grid;
    grid-template-columns: 12rem auto 12rem;
    grid-template-rows: 1fr;
    
    gap: 0 1rem;

    .lastRegisters{
        width: 100%;
        color: ${({ theme }) => theme.COLORS.THEME_700};

        table {
            td {
                border-bottom: 1px solid ${({ theme }) => theme.COLORS.THEME_700};
            }
        }

        .col1{
            width: 300px;
        }
        .col2{
            width: 155px;
            text-align: center;
        }
        .lastRegistersTable{
            max-height: 150px;
            overflow-y: auto;
        }
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
            width: 12rem;
            height: 12rem;

            border-radius: 8px;

            object-fit: cover;
        }
    }
`;

export const CategoriesContainer = styled.div`
    max-height: 21rem;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: .2rem;

    border-radius: 8px;
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