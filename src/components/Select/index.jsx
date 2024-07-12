import { Container, SelectContainer } from "./styles";

export function Select({className, label, name, id, mandatory,...rest}) {
    return(
        <Container className={className}>
            <label htmlFor={name}>
                {label}
                <span>
                    {mandatory ? "*" : ""}
                </span>
            </label>
            <SelectContainer name={name} id={id} {...rest}>
            </SelectContainer>
        </Container>
    )
}