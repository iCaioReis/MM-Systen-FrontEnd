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

    &.input-smaller-width {
        max-width: 3.5rem;
    }
    &.input-small-width {
        max-width: 5rem;
    }
    &.input-medium-width {
        max-width: 7.5rem;
    }
    &.input-larger-width {
        max-width: 11rem;
    }

    > input {
        width: 100%;
        height: 2.5rem;

        padding: 0 1rem;

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