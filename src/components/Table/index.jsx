import { Container } from "./styles";

export function Table({data, rows}){
    const header = ["Nome", "Endereço"]
    

    return (
        <Container>

            <table>
                {header.map((element) => {
                    return (
                    <th>
                        {element}
                    </th>
                    )
                })}
            </table>
        </Container>
    )

}