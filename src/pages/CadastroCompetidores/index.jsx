import avatarPlaceholder from "../../assets/user.svg";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";

import { Container, Date } from "./styles";

export function CadastroCompetidor() {
    return (
        <Container>
            <div>
                <img src={avatarPlaceholder} alt="" />
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
                        className={"input-medium-width"}
                        mandatory
                        placeholder="Selecione"
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"CPF"}
                        dataType={"CPF"}
                        className={"input-larger-width"}
                        mandatory
                        placeholder="_ _ _ . _ _ _ . _ _ _ . _ _"
                    />
                    <Input
                        title={"Categoria"}
                        data="Juvenil"
                        className={"input-medium-width"}
                        mandatory
                    />
                    
                    <Input
                        title={"Data categoria"}
                        data="11/07/2024"
                        className={"input-medium-width"}
                        disabled
                    />

                    <Date className="date">
                        <Input 
                            title={"Nascimento"}
                            className={"input-smaller-width"}
                            dataType={"NUMBER"}
                            mandatory
                            placeholder="Dia"
                        />
                        <Input 
                            dataType={"NUMBER"}
                            className={"input-small-width"}
                            mandatory
                            placeholder="Mês"
                        />
                        <Input 
                            dataType={"NUMBER"}
                            mandatory
                            placeholder="Ano"
                        />
                        <Input
                            title={"Idade"}
                            className={"input-smaller-width"}
                            data={"27"}
                            disabled
                        />
                    </Date>
                </div>

                <Section title={"Contato"} />
                <div className="flex">
                    <Input
                        title={"Telefone"}
                        placeholder="Ex.: (99) 99999-9999"
                    />
                    
                    <Input
                        title={"E-mail"}
                        placeholder="Ex.: exemplo@email.com"
                    />
                </div>
                <div className="flex">
                    <Input
                        title={"Endereço"}
                        placeholder="Ex. Rua, Avenida, Logradouro..."
                    />
                    <Input
                        className={"input-small-width"}
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
                        title={"Cidade"}
                        placeholder="Ex. Vitória da Conquista"
                    />
                    <Input
                        className={"input-small-width"}
                        title={"UF"}
                        placeholder={"Ex.: BA"}
                    />
                    <Input
                        title={"País"}
                        placeholder="Ex.: Brasil"
                    />
                </div>
                
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