import { Container } from "./styles";

import { Button } from "../Button";

export function Modal({ onClose, onConfirm, visible, content }) {
    if (!visible) return null;

    return (
        <Container>
            <div className="modal">
                <Button
                    className="noBackground auto-width exit"
                    onClick={onClose}
                >X</Button>

                {/*<Button onClick={onConfirm} className="danger">Confirmar</Button>*/}
                
                {content}
            </div>
        </Container>
    )
}