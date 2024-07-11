import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    > div {
        display: flex;
        gap: 4px;

        p {
            color: ${({ theme }) => theme.COLORS.THEME_700};
        }
        span {
            color: ${({ theme }) => theme.COLORS.RED};
        }
    }

    > input {
        width: 100%;

        padding: 1rem 2rem;

        border-style: none;
        border-radius: 8px;

        background-color: ${({ theme }) => theme.COLORS.LIGHT_100};

        &:disabled {
            color: ${({ theme }) => theme.COLORS.THEME_700};

            background-color: ${({ theme }) => theme.COLORS.LIGHT_300};

            border: 2px dashed  ${({ theme }) => theme.COLORS.THEME_700};
        }
    }
`;