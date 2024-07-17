import { Container } from "./styles";

export function Table({ header, rows, widths, maxRows, ...rest }) {

    return (
        <Container {...rest}>
            <thead>
                <tr>
                    {Object.keys(header).map((field, index) => (
                        <th key={index} style={{ width: widths[field] || 'auto' }}>
                            {header[field]}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </Container >
    )

}