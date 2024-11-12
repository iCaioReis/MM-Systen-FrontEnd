import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modalCategory {
    width: 75rem;
    height: 40rem;

    padding: 20px;

    display: grid;
    grid-template-columns: auto 12rem;
    gap: .5rem;

    position: relative;

    border-radius: 8px;

    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    background: ${({ theme }) => theme.COLORS.LIGHT_200};
}`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;

  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    margin: 1rem 0 3rem;

    h3 {
      color: ${({ theme }) => theme.COLORS.THEME_600};
      font-weight: 400;
    }
  }
`;

export const MainForm = styled.div`
  svg{
    color: ${({ theme }) => theme.COLORS.THEME_700};
  }
  
  .registers {
    max-height: 31rem;

    position: relative;
    overflow-y: scroll;
    
    border-radius: 8px;
  }
  .active {
    max-height: 26.625rem;
  }
  .flex-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    button {
      background: none;
      border: none;

      padding: 4px;
      margin: 4px 0;
    }

    .delete {
      svg {
        color: ${({ theme }) => theme.COLORS.RED};
      }
    }

    .up, .down{
      background-color: ${({ theme }) => theme.COLORS.THEME_700};
      border-radius: 8px;
      padding: 4px 6px;
      svg {
        color: ${({ theme }) => theme.COLORS.LIGHT_200};
      }
    }

    .up {
      svg {
        transform: rotateY(180deg);
      }
    }
  }
`;

export const Status = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
`;