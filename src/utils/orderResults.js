export function orderResults(data) {
    const fullData = data.proofs.map(proof => {
        proof.categories.forEach(categorie => {
            // Ordena competidores por nome
            categorie.competitors.sort((a, b) => {
                const nameA = a.competitor_name ? a.competitor_name.toLowerCase() : '';
                const nameB = b.competitor_name ? b.competitor_name.toLowerCase() : '';
                return nameA.localeCompare(nameB);
            });

            const competitorCounts = categorie.competitors.reduce((acc, item) => {
                acc[item.competitor_name] = (acc[item.competitor_name] || 0) + 1;
                return acc;
            }, {});

            categorie.competitors.forEach(item => {
                const totalTime = Number(item.time) + (Number(item.fouls) * 5); // Garante que seja um número
                // Converte o totalTime para string e formata com 3 casas decimais
                const totalTimeString = totalTime.toFixed(3);
                const [integerPart, decimalPart] = totalTimeString.split('.');

                // Preenche com zeros à esquerda o número inteiro
                const formattedIntegerPart = integerPart.padStart(3, '0');
                // Preenche com zeros à direita o número decimal, se necessário
                const formattedDecimalPart = decimalPart.padEnd(3, '0');

                // Junta as partes formatadas
                item.total_time = `${formattedIntegerPart}.${formattedDecimalPart}`;

                //Adiciona o campo valid
                if (item.SAT === 1 || item.NCP === 1) {
                    item.valid = undefined; // Deixa vazio
                } else {
                    item.valid = competitorCounts[item.competitor_name] > 1 ? false : true;
                }

            });

            const competitorBestTimes = categorie.competitors.reduce((acc, item) => {
                if (item.valid === undefined) return acc; // Ignora não válidos
                if (!acc[item.competitor_name] || item.total_time < acc[item.competitor_name].total_time) {
                    acc[item.competitor_name] = item;
                }
                return acc;
            }, {});

            categorie.competitors.forEach(item => {
                if (competitorBestTimes[item.competitor_name] === item) {
                    item.valid = true;
                }
            });

            const validItems = categorie.competitors.filter(item => item.valid === true);
            const satItems = categorie.competitors.filter(item => item.SAT === 1);
            const invalidItems = categorie.competitors.filter(item => item.valid === false);
            const ncpItems = categorie.competitors.filter(item => item.NCP === 1);

            // Ordena os itens válidos pelo tempo, do menor para o maior
            validItems.sort((a, b) => a.time - b.time);


            // Ordena os outros itens em ordem alfabética por competitor_name
            satItems.sort((a, b) => a.competitor_name.localeCompare(b.competitor_name));
            invalidItems.sort((a, b) => a.competitor_name.localeCompare(b.competitor_name));
            ncpItems.sort((a, b) => a.competitor_name.localeCompare(b.competitor_name));

            // Combina todos os grupos na ordem desejada
            const finalSortedData = [...validItems, ...satItems, ...invalidItems, ...ncpItems];

            categorie.competitors = finalSortedData;
        });
    });
}