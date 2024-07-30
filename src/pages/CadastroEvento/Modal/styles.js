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

    .modal {
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
    color: ${({ theme }) => theme.COLORS.RED};
  }

  .registers {
    max-height: 426px;

    position: relative;
    overflow-y: scroll;
    
    border-radius: 8px;
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

  
  
  