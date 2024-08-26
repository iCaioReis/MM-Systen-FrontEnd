import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgba(0, 0, 0, 0.7);
    
    .modal {
        min-width: 40rem;
        min-height: 20rem;

        padding: 2rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 3.5rem;

        position: relative;

        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        background: ${({ theme }) => theme.COLORS.LIGHT_200};

        h2, h3 {
            color: ${({ theme }) => theme.COLORS.THEME_900};
        }

        .flex{
            display: flex;
            gap: 1rem;
            button {
                width: 10rem;
            }
        }
        .exit {
            position: absolute;
            top: 0;
            right: 0;

            &:hover {
                color: ${({ theme }) => theme.COLORS.RED};
            }
        }

        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 3.5rem; 
        }
}`;