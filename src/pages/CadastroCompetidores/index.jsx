import { FiAirplay } from "react-icons/fi";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";

import { Container, Date } from "./styles";

export function CadastroCompetidor() {
    function imprimir() {
        alert("Deu certo")
    }
    return (
        <Container>
            <div>
                <img src="" alt="" />
                <Button>Salvar</Button>
            </div>

            <div>
                <h1>Cadastro Competidor</h1>

                <Section title={"Dados competidor"} />

                <div className="flex">
                    <Input
                        title={"Nome"}
                        data={"José da Silva Santos"}
                        mandatory
                        placeholder="Digite o nome do competidor"
                    />
                    <Input
                        title={"Sexo"}
                        data={"Selecione"}
                        mandatory
                        placeholder="Selecione"
                    />
                </div>

                <div className="flex">
                    <Input
                        title={"CPF"}
                        dataType={"CPF"}
                        mandatory
                        placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"
                    />

                    <Date className="date">
                        <Input title={"Nascimento"} dataType={"NUMBER"} mandatory placeholder="_ _ _" />
                        <Input dataType={"NUMBER"} mandatory placeholder="_ _ _" />
                        <Input dataType={"NUMBER"} mandatory placeholder="_ _ _" />
                        <Input title={"Idade"} data={"18"} disabled />
                    </Date>
                </div>

                <Section title={"Contato"} />
                <div className="flex">
                    <Input
                        title={"Endereço"}
                        placeholder="Ex. Rua, Avenida, Logradouro..."
                    />
                    <Input
                        title={"Número"}
                        placeholder={"Nº"}
                    />
                    <Input
                        title={"Bairro"}
                        placeholder="Ex.: Centro"
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"Endereço"}
                        placeholder="Ex. Rua, Avenida, Logradouro..."
                    />
                    <Input
                        title={"Número"}
                        placeholder={"Nº"}
                    />
                    <Input
                        title={"Bairro"}
                        placeholder="Ex.: Centro"
                    />
                </div>

                <Section title={"Categoria"} />
            </div>

            <div className="status" >
                <Input
                    title={"Número único"}
                    data={"01"}
                    disabled
                    status
                />
                <Input
                    title={"Situação do cadastro"}
                    data={"Ativo"}
                    disabled
                    status
                />
                <Input
                    title={"Data Cadastro"}
                    data={"01/01/2001"}
                    disabled
                    status
                />

            </div>


        </Container>
    )
}