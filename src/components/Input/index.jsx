import { useState } from "react";
import { PatternFormat } from 'react-number-format';

import { Container } from "./styles";

export function Input({ title, disabled, mandatory, dataType, data, status, className, onChange, ...rest }) {
    const FormatCpf = "###.###.###-##";
    const FormatTimer = "###.###";
    const FormatMoney = "####.##";

    const [value, setValue] = useState(data || "");

    const handleChange = (e) => {
        let inputValue = e.target.value;

        if (dataType === "NUMBER") {
            inputValue = inputValue.replace(/\D/g, "");
        }

        setValue(inputValue);
        if (onChange) onChange(e, inputValue);
    };

    return (
        <Container className={className}>
            <div>
                <p>{title && title}</p>
                <span>{title && mandatory && '*'}</span>
            </div>
            
            {dataType == "CPF" &&
                <PatternFormat 
                    format={FormatCpf}
                    mask={"_ "}
                    allowEmptyFormatting
                    className={status ? 'status' : ''}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    {...rest}
                    ></PatternFormat>
            }
            {dataType == "timer" &&
                <PatternFormat 
                    format={FormatTimer}
                    mask={"_"}
                    allowEmptyFormatting
                    className={status ? 'status' : ''}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    {...rest}
                    ></PatternFormat>
            }
            {dataType == "money" &&
                <PatternFormat 
                    format={FormatMoney}
                    mask={"_"}
                    allowEmptyFormatting
                    className={status ? 'status' : ''}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    {...rest}
                    ></PatternFormat>
            }

            {!dataType &&
                <input
                className={status ? 'status' : ''}
                type="text"
                value={value}
                disabled={disabled}
                onChange={handleChange}
                {...rest}
            />
            }
            
        </Container>
    );
}