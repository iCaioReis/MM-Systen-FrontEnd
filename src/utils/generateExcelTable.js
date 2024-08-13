import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormatProof, FormatCategory } from './formatDatas';

export function generateExcelTable(data) {
    const workbook = XLSX.utils.book_new();

    data.proofs.map((proof) => {
        const proofName = FormatProof(proof.name)
        proof.categories.map((categorie, index) => {
            const categorieName = FormatCategory(categorie.name);
            //console.log(`Prova: ${proofName}   Categoria: ${categorieName}`)

            const sheetData = [["N", "Competidor", "Cavalo", "Tempo", "Faltas", "Acréssimo", "Tempo total", "SAT", "NPC"]];

            categorie.competitors.map((competitor, index) => {
                const competitorSheetData = [`${index + 1}`, `${competitor.competitor_name}`, `${competitor.horse_name}`]

                sheetData.push(competitorSheetData);
            });
            // Cria as folhas (abas)
            const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
            // Cria o workbook com as diferentes abas
            XLSX.utils.book_append_sheet(workbook, worksheet, `${proofName} ${categorieName}`);
            console.log(sheetData)
        })
    })

    // Converte o workbook para um arquivo binário
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Função para converter a string em binário
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    };

    // Salva o arquivo
    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `${data.name}.xlsx`);
};