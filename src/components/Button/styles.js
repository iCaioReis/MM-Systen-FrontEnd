import styled from "styled-components";

export const Container = styled.button`
    width: 100%;
    height: 2.5rem;

    padding: 0 1rem;

    border-style: none;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.THEME_900};

    &.text_light_size {
        font-size: .9rem;
    }

    &.noBackground {
        background: none;

        color: ${({ theme }) => theme.COLORS.THEME_900};
    }
    &.noBorder {
        border-style: none;
    }
    &.larger-width {
        width: 20rem;
    }
    &.auto-width {
        width: auto;
    }
    &.danger {
        padding: .6rem 1rem;

        border: 2px dashed  ${({ theme }) => theme.COLORS.RED};

        color: ${({ theme }) => theme.COLORS.RED};
        font-weight: 700;

        background-color: transparent;

        transition: filter 0.2s;

        &:hover {
            filter: none;
            color: ${({ theme }) => theme.COLORS.LIGHT_100};
            background-color: ${({ theme }) => theme.COLORS.RED};
        }

        &.inverted{
            color: ${({ theme }) => theme.COLORS.LIGHT_100};

            background-color: ${({ theme }) => theme.COLORS.RED};

            &:hover {
            filter: brightness(0.7);
            }
        }

    }
    &:focus{
        border: 3px solid  ${({ theme }) => theme.COLORS.LIGHT_100};
    }
`;