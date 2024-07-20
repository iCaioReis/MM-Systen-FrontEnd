import { GoPencil } from "react-icons/go";

import { useNavigate } from 'react-router-dom';

import { Listing } from './styles';

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Table } from '../../../components/Table';

const larguras = {
    id: "",
    name: "400px",
    gender: "",
    privilege: "",
    born: "",
    created_at: "",
    state: "",
    button: "80px"
}
const header = {
    id: "Nº",
    name: "Nome",
    gender: "Sexo",
    privilege: "Privilégio",
    born: "Ïdade",
    created_at: "Data Registro",
    state: "Status",
    button: ""
}

export function UserListing({users}) {
    const navigate = useNavigate();
    function handleDetails(id) {
        navigate(`/cadastro/usuario/${id}`);
        window.location.reload();
    }

    function handleAdd() {
        navigate(`/cadastro/usuario`);
        window.location.reload();
    }

    return (
        <Listing>
            <h1>Cadastro Usuario</h1>
            <div className="flex">
                <Button 
                    onClick={handleAdd}
                    className={"larger-width"}
                >
                    Registrar usuário
                </Button>
                <Input
                    title={" "}
                    placeholder={"Pesquisar por nome"}
                />
                <Input
                    title={"Registros"}
                    className={"input-small-width"}
                    status
                    value={users.length}
                    disabled
                />
            </div>
            
            <Table 
                header={header} 
                widths={larguras}
                rows={
                    users.map((row, index) => {
                        const id = row.id
                        return(
                        <tr key={index}>
                            {Object.keys(header).map((field, subIndex) => {
                                if (field == "gender") {
                                    return (
                                        <td key={subIndex}>

                                            {row.gender == "male" ? "Masculino" : "Feminino"}
                                        </td>
                                    )
                                }
                                if (field == "privilege") {
                                    return (
                                        <td key={subIndex}>
                                            {row.privilege == "sup" ? "SUP" : row.privilege == "judge" ? "Juiz" : row.privilege == "administrator" ? "Administrador": "Usuário Comum"}
                                        </td>
                                    )
                                }

                                if (field == "state") {
                                    return (
                                        <td key={subIndex}>
                                            {row.state == "active" ? "Ativo" : "Inativo"}
                                        </td>
                                    )
                                }

                                if (field == "button") {
                                    return (
                                        <td key={subIndex}>
                                            <Button 
                                                className={"noBackground"}
                                                onClick= {() => handleDetails(id)}
                                            >
                                                <GoPencil size={20}/>
                                            </Button>
                                        </td>
                                    )
                                }
                                return(
                                <td key={subIndex}>{row[field]}</td>
                                )})}

                        </tr>
                    )})
            }
            />
        </Listing>
    )
}

