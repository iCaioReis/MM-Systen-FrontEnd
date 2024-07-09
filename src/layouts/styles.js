import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;

    display: grid;
    grid-template-areas: 
    "header header"
    "sidebar main";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
 

.header {
  grid-area: header;
}
`;