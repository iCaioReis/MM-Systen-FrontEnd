import { Container } from "./styles";

export function Section({title}){
    return(
        <Container>
            <span>{ title && title}</span>
            <div/>
        </Container>
    )
}