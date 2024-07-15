import { Container } from "./styles";

export function Table({ header, rows, widths, maxRows }) {

    return (
        <Container>

            <table>
                <thead>
                    {Object.keys(header).map((field, index) => (
                        <th key={index} style={{ width: widths[field] || 'auto' }}>
                            {header[field]}
                        </th>
                    ))}
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {Object.keys(header).map((field, subIndex) => (
                                <td key={subIndex}>{row[field]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )

}