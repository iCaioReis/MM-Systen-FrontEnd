import logoEsporte from "../../assets/logoEsporte.png"
import { useState } from "react";

import { useAuth } from '../../hooks/auth';

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form } from "./styles";

export function SignIn(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useAuth();

    function handleSignIn(){
        signIn({ login, password });
    }
  
    return(
        <Container>
            <Form>
                <h1>Faça Login</h1>

                <Input
                    placeholder="Digite o usuário"
                    title={"Usuário"}
                    type="text"
                    onChange = {e => setLogin(e.target.value)}
                />

                <Input
                    placeholder="Digite a senha"
                    title={"Senha"}
                    type="password"
                    onChange = {e => setPassword(e.target.value)}
                />

                <Button title={"Entrar"} onClick={handleSignIn}>Entrar</Button>

                <a href={"https://github.com/iCaioReis"} target= {"_blank"}>Developed by <strong>Caio Reis</strong></a>

            </Form>

            <img  src={logoEsporte}/>
        </Container>
    );
}