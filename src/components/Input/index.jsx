import { useState } from "react";

import { Container } from "./styles";

export function Input({title, disabled, mandatory, dataType, data, ...rest}){
    const [value, setValue] = useState(data || "");

    const handleChange = (e) => {
        let inputValue = e.target.value;

        if(dataType === "CPF") {

        // Remove qualquer caractere que não seja número
        inputValue = inputValue.replace(/\D/g, "");

        // Limita a 11 dígitos
        if (inputValue.length > 11) {
            inputValue = inputValue.slice(0, 11);
        }

        // Aplica a máscara de CPF
        if (inputValue.length > 9) {
            inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (inputValue.length > 6) {
            inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
        } else if (inputValue.length > 3) {
            inputValue = inputValue.replace(/(\d{3})(\d{3})/, "$1.$2");
        }
        }

        setValue(inputValue);
    };

    console.log(value)

    return(
        <Container>
            <div>
                <p>{title && title}</p>
                <span>{title && mandatory ? '*' : '' }</span>
            </div>
            
            <input 
            type="text"
            value={value}
            disabled={disabled}
            onChange={handleChange}
            {...rest}
            />

        </Container>
    )
}