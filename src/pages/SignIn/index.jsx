import logoEsporte from "../../assets/logoEsporte.png"
import { useState } from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form } from "./styles";

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    return(
        <Container>
            <Form>
                <h1>Faça Login</h1>

                <Input
                    placeholder="Digite o usuário"
                    title={"Usuário"}
                    type="text"
                    onChange = {e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Digite a senha"
                    title={"Senha"}
                    type="password"
                    onChange = {e => setPassword(e.target.value)}
                />

                <Button 
                    title={"Entrar"}
                >
                    Entrar
                </Button>

                <a href={"https://github.com/iCaioReis"} target= {"_blank"}>Developed by <strong>Caio Reis</strong></a>

            </Form>

            <img  src={logoEsporte}/>
        </Container>
    );
}