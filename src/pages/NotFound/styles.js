import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > h1 {
    font-size: 64px;
    color: ${({ theme }) => theme.COLORS.THEME_900};
  }
  > h2 {
    color: ${({ theme }) => theme.COLORS.THEME_900};
  }
  
  > a {
    color: ${({ theme }) => theme.COLORS.THEME_600};
    margin-top: 24px;
  }
`;