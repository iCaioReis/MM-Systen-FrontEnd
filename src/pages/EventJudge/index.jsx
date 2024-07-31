import { useState } from 'react';

import { EventListing } from './EventListing';

import { Container } from './styles';

export function EventJudge() {
    return (
        <Container>
            <nav>
                <button>Listagem</button>
            </nav>
            <EventListing/>
        </Container>
    );
}
