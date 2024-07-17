import { GoPencil } from "react-icons/go";

import { useNavigate } from 'react-router-dom';

import { Listing } from './styles';

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Table } from '../../../components/Table';

const larguras = {
    id: '',
    nome: '400px',
    sexo: '',
    categoria: '',
    idade: '',
    dataRegistro: '',
    status: '',
    button: ''
}
const header = {
    id: "Nº",
    nome: "Nome",
    sexo: "Sexo",
    categoria: "Categoria",
    idade: "Ïdade",
    dataRegistro: "Data Registro",
    status: "Status",
    button: ""
}
const rows = [
    {
        id: 1,
        nome: "Nome",
        sexo: "Sexo",
        categoria: "Categoria",
        idade: "16",
        data_registro: "Data Registro",
        status: "Status"
    },
    {
        id: 2,
        nome: "Nome",
        sexo: "Sexo",
        categoria: "Categoria",
        idade: "20",
        data_registro: "Data Registro",
        status: "Status"
    }
]

export function HorseListing() {
    const navigate = useNavigate();

    function handleDetails(id) {
        navigate(`/cadastro/cavalo/${id}`);
        window.location.reload();
    }

    function handleAdd() {
        navigate(`/cadastro/cavalo`);
        window.location.reload();
    }

    return (
        <Listing>
            <h1>Cadastro Cavalo</h1>
            <div className="flex">
                <Button onClick={handleAdd}>Registrar cavalo</Button>
                <Input
                    title={" "}
                    placeholder={"Pesquisar por nome"}
                />
                <Input
                    title={"Registros"}
                    className={"input-small-width"}
                    value={2}
                    disabled
                />
            </div>
            
            <Table 
                header={header} 
                widths={larguras}
                rows={
                    rows.map((row, index) => {
                        const id = row.id
                        return(
                        <tr key={index}>
                            {Object.keys(header).map((field, subIndex) => {
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
            }/>
        </Listing>
    )
}

