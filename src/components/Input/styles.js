import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: .3rem;

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

        padding: .7rem 1rem;

        border-style: none;
        border-radius: 8px;

        background-color: ${({ theme }) => theme.COLORS.LIGHT_100};

        &.status {
            text-align: center;
            font-weight: 900;
            font-size: 1.2rem;

            padding: .6rem 1rem;
        }

        &:disabled {
            color: ${({ theme }) => theme.COLORS.THEME_700};

            background-color: ${({ theme }) => theme.COLORS.LIGHT_300};

            border: 2px dashed  ${({ theme }) => theme.COLORS.THEME_700};
        }
    }
`;