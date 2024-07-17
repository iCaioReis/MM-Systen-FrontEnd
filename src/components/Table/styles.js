import styled from "styled-components";

export const Container = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;

    thead {
        th:first-child {
            border-radius: 8px 0 0;
        }
        th:last-child{
            border-radius: 0 8px 0 0;
        }
        background-color: ${({ theme }) => theme.COLORS.THEME_600};
    }

    th {
        padding: .5rem 1rem;
    }

    tbody {
        td {
            padding: 0 1rem;

            color: ${({ theme }) => theme.COLORS.THEME_900};

            border-top: 3px solid ${({ theme }) => theme.COLORS.LIGHT_200};
            border-left: 1px solid ${({ theme }) => theme.COLORS.LIGHT_400};

            background-color: ${({ theme }) => theme.COLORS.LIGHT_300};
        }
        td:nth-child(1){
            border-left: none;
        }
    }
    .width-larger{
        width: 30px;
    }
`;