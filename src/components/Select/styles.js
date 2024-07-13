import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: .3rem;

    > label {
        display: flex;
        gap: 4px;

        color: ${({ theme }) => theme.COLORS.THEME_700};

        span {
            color: ${({ theme }) => theme.COLORS.RED};
        }
    }

    &.smaller-width {
        max-width: 3.5rem;
    }
    &.small-width {
        max-width: 5rem;
    }
    &.medium-width {
        max-width: 7.5rem;
    }
    &.larger-width {
        max-width: 11rem;
    }
`;

export const SelectContainer = styled.select`
    width: 100%;
    height: 2.5rem;

    padding: 0 1rem;

    border-style: none;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.COLORS.LIGHT_100};

    font-size: 1rem;
`;