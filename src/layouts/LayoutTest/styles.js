import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;

    display: grid;
    grid-template-areas: 
    "logo main"
    "sidebar main";
    grid-template-columns:  18rem 1fr;
    grid-template-rows: 5rem 1fr;

    .Sidebar{
      grid-area: sidebar;
    }
    .Main {
      grid-area: main;
    }

   
`;
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.THEME_700};

  >img {
    padding: 0 1rem;
    width: 15rem;
  }

  grid-area: logo;
`;