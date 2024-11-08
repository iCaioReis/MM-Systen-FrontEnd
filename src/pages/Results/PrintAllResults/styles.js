import styled from "styled-components";

export const Container = styled.div`
    padding: 1rem 2rem;
    width: 100%;
    background-color: #ffffff;

    color: ${({ theme }) => theme.COLORS.THEME_900};

    
     header {
        width: 100%;
        display: flex;
        background-color: ${({ theme }) => theme.COLORS.THEME_900};
        
        border-radius: 8px 8px 0 0;

        div:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
    
            color: #ffffff;
        }

        img {
            width: 200px;
            height: 75px;
            object-fit: cover;
        }
        
    }

    .ProofAndCategory{
        display: flex;

        border-right: 1px solid ${({ theme }) => theme.COLORS.THEME_900};
        h2 {
            padding: .3rem 3rem;
            width: 50%;
            border-left: 1px solid ${({ theme }) => theme.COLORS.THEME_900};

            span {
                font-weight: 400;
            }
        }
    }

    table, tr, td {
        border-collapse: collapse;
        border: 1px solid ${({ theme }) => theme.COLORS.THEME_900};
        padding: .5rem;

        thead{
            font-weight: 600;
        }

        .col1{
            width: 470px;
        }
        .col2{
            width: 150px;
        }
    }

    .ProofCategoryContainer {
        border-top: 1px solid ${({ theme }) => theme.COLORS.THEME_900};
        margin-bottom: 2rem;
    }
    

    @media print {
    .page-break {
        display: block;
        page-break-before: always;
  }
}

    /* Para evitar quebras dentro de um elemento */
.no-break {
    page-break-inside: avoid; /* Não quebrar dentro do elemento */
    break-inside: avoid;       /* Usando o CSS moderno */
}

.red {
    color: ${({ theme }) => theme.COLORS.RED};
}
`;