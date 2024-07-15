import { useState } from "react";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    return(
        <Container>
            <Form>
                <h1>Faça Login</h1>

                <Input
                    placeholder="E-mail"
                    type="text"
                    onChange = {e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    onChange = {e => setPassword(e.target.value)}
                />

                <Button title={"Entrar"} >
                    Entrar
                </Button>

            </Form>

            <Background></Background>
        </Container>
    );
}