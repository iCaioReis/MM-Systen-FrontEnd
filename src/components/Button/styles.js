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
    gap: 1rem;

    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    background-color: ${({ theme }) => theme.COLORS.THEME_900};

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
    }
`;