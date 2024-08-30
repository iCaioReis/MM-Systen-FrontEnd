import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaArrowRight } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";

import avatarPlaceholder from "../../../assets/user.svg";

import { FormatStatus } from '../../../utils/formatDatas.js';

import { api } from '../../../services/api.js';

import { Input } from "../../../components/Input/index.jsx";
import { Button } from "../../../components/Button/index.jsx";
import { Section } from "../../../components/Section/index.jsx";

import { List } from '../List/index.jsx';

import { CategoriesContainer, DateContainer, Form, MainForm, Status, Profile, Picture } from './styles.js';

const initialData = {
    id: "",
    state: "active",
    created_at: "0000-00-00",
    name: "",
    start_date: "",
    end_date: "",
};

export function EventFormm({ event, mode = "add" }) {
    const [data, setData] = useState(initialData);
    const navigate = useNavigate();

    const refresh = () => {
        window.location.reload();
    }

    useEffect(() => {
        if (event && mode === 'show') {
            setData({ ...initialData, ...event });
        }
    }, [event]);

    return (
        <Form>
            <Profile>
                <div>
                    <Picture>
                        <img src={avatarPlaceholder} alt="" />
                    </Picture>
                    <Button onClick={() => refresh()}>
                        <TfiReload/>
                        Atualizar Status
                    </Button>
                </div>
            </Profile>

            <MainForm>
                <h1>Arbitragem - Evento</h1>

                <Section title={"Dados evento"} />

                <div className="flex">
                    <Input
                        title={"Nome do evento"}
                        name="name"
                        value={data.name}
                        disabled
                    />

                    <DateContainer className="date">
                        <Input
                            title={"Data início"}
                            name="start_date"
                            value={data.start_date}
                            type={"date"}
                            className={"input-larger-width"}
                            disabled
                        />

                        <FaArrowRight size={20} />

                        <Input
                            title={"Data fim"}
                            name="end_date"
                            value={data.end_date}
                            type={"date"}
                            className={"input-larger-width"}
                            disabled
                        />
                    </DateContainer>
                </div>

                <Section title={"Provas"} />

                <CategoriesContainer>
                    {data.proofs && data.proofs.map((proof, index) => {
                        return (
                            <List key={index} title={proof.name} categories={proof.categories} refresh={refresh}></List>
                        )
                    })}
                </CategoriesContainer>

            </MainForm>

            <Status>

                <Input
                    title={"Número único"}
                    value={data.id}
                    disabled
                    status
                />
                <Input
                    title={"Status"}
                    value={FormatStatus(data.state)}
                    disabled
                    status
                />
            </Status>

        </Form>
    );
}
