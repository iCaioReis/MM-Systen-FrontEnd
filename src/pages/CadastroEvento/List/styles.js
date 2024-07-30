import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    position: relative;
  
  .category-list {
    list-style-type: none;
    padding: 0;
  }
  
  .category-header,
  .category-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }
  
  .category-header {
    font-weight: bold;
    border-bottom: 2px solid #ccc;
    margin-bottom: 8px;
  }
  
  .category-item {
    border-bottom: 1px solid #ccc;
  }
  
  .category-item span {
    flex: 1;
    text-align: left;
  }
  
  .category-item span:last-child {
    text-align: right;
  }

  .exit {
    position: absolute;
    right: 0;
    top: 0;
  }

  .modal {
    width: 75rem;
    height: 40rem;
  }

  h1, h3, li {
    color: ${({ theme }) => theme.COLORS.THEME_700};
  }

  li:not(:first-child):hover {
    
    cursor: pointer;
    background-color: ${({ theme }) => theme.COLORS.LIGHT_300};
  }
`;