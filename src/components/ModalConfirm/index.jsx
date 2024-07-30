import { Container } from "./styles";

import { Button } from "../Button";

export function ModalConfirm({title, subTitle, onClose, onConfirm, visible}){
    if (!visible) return null;

    return(
        <Container>
            <div className="modal">
                <h2>{title}</h2>
                <h3>{subTitle}</h3>
                <div className="flex">
                    <Button onClick={onClose}>Voltar</Button>
                    <Button onClick={onConfirm}className="danger">Confirmar</Button>
                </div>
            </div>
        </Container>
    )
}