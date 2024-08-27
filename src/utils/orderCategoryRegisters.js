function organizeCompetitions(competitions) {
    const organized = [];
    const lastAppearance = {};
    let currentOrder = 1;

    const canPlaceCompetition = (competition) => {
        const { competitor_id, horse_id } = competition;
        const lastCompetitorAppearance = lastAppearance[`competitor_${competitor_id}`];
        const lastHorseAppearance = lastAppearance[`horse_${horse_id}`];

        return (
            (lastCompetitorAppearance === undefined || currentOrder - lastCompetitorAppearance >= 3) &&
            (lastHorseAppearance === undefined || currentOrder - lastHorseAppearance >= 3)
        );
    };

    while (competitions.length > 0) {
        let placed = false;

        for (let i = 0; i < competitions.length; i++) {
            if (canPlaceCompetition(competitions[i])) {
                const current = competitions.splice(i, 1)[0];
                current.competitor_order = currentOrder++;
                organized.push(current);
                lastAppearance[`competitor_${current.competitor_id}`] = currentOrder - 1;
                lastAppearance[`horse_${current.horse_id}`] = currentOrder - 1;
                placed = true;
                break;
            }
        }

        // Se nenhum item pôde ser colocado, isso significa que os restantes precisam ser reordenados
        if (!placed) {
            const remaining = competitions.splice(0);
            remaining.forEach((item) => {
                item.competitor_order = currentOrder++;
                organized.push(item);
            });
        }
    }

    return organized;
}

// Exemplo de dados
const competitions = [
    { id: 56, state: 'finished', competitor_order: 7, time: '000.0000 s', competitor_id: 5, horse_id: 6 },
    { id: 56, state: 'finished', competitor_order: 7, time: '000.0000 s', competitor_id: 5, horse_id: 6 },
    { id: 56, state: 'finished', competitor_order: 7, time: '000.0000 s', competitor_id: 5, horse_id: 6 },
    { id: 58, state: 'finished', competitor_order: 10, time: '000.0000 s', competitor_id: 2, horse_id: 8 },
    { id: 58, state: 'finished', competitor_order: 10, time: '000.0000 s', competitor_id: 2, horse_id: 8 },
    { id: 57, state: 'finished', competitor_order: 11, time: '012.3123 s', competitor_id: 7, horse_id: 3 },
    { id: 59, state: 'finished', competitor_order: 12, time: '000.0000 s', competitor_id: 3, horse_id: 9 },
    { id: 60, state: 'finished', competitor_order: 13, time: '000.0000 s', competitor_id: 5, horse_id: 10 },
    { id: 54, state: 'finished', competitor_order: 8, time: '000.0000 s', competitor_id: 6, horse_id: 2 },
    { id: 55, state: 'finished', competitor_order: 14, time: '000.0000 s', competitor_id: 8, horse_id: 2 },
];

const organizedCompetitions = organizeCompetitions(competitions);
console.log(organizedCompetitions);
