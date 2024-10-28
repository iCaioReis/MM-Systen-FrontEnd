import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FormatProof, FormatCategory } from './formatDatas';

import Logo from '/logo.png'

import { generateExcel } from "mr-excel";

export function generateExcelTable(data) {
    const workbook = XLSX.utils.book_new();

    const calculatePoints = (index) => {
        const tablePontis = [
            17,
             13,
             10,
             8,
             7,
             6,
             5,
             4,
             3,
             2
        ]
        const points = tablePontis[index] || 1
        return(points )
    }

    data.proofs.map((proof) => {
        const proofName = FormatProof(proof.name)
        proof.categories.map((categorie, index) => {
            const categorieName = FormatCategory(categorie.name);
            //console.log(`Prova: ${proofName}   Categoria: ${categorieName}`)

            const sheetData = [["N", "Competidor", "Cavalo", "Tempo", "Faltas", "Acréssimo", "Tempo total", "Pontos"]];

            categorie.competitors.map((competitor, index) => {
                const competitorSheetData = [
                    `${index + 1}`,
                    `${competitor.competitor_name}`,
                    `${competitor.horse_name}`,
                    `${competitor.time} s`,
                    `${competitor.fouls}`,
                    `${competitor.fouls * 5}.000 s`,
                    `${(parseFloat(competitor.time) + parseInt(competitor.fouls) * 5).toFixed(3)}`,   
                    `${competitor.SAT ? "SAT" : competitor.NCP ? "NCP" : competitor.valid == false ? "Descartado" : calculatePoints(index)}`,
                ]

                sheetData.push(competitorSheetData);
            });
            // Cria as folhas (abas)
            const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

            const textStyle = { font: { bold: true, color: { rgb: "FF0000" } } }; // Texto vermelho

            worksheet['A1'].s = textStyle;
            
            // Cria o workbook com as diferentes abas
            XLSX.utils.book_append_sheet(workbook, worksheet, `${proofName} ${categorieName}`);
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

export function generateExcelTable1(data) {
    console.log(data)

    const competitorStyle = {
        backgroundColor: colorPalette.c2,
        fontFamily: "Times New Roman",
        color: colorPalette.c4,
        border: {
          full: {
            style: "medium",
            color: colorPalette.c1,
          },
        },
        alignment: {
          horizontal: "left",
          vertical: "top",
        },
      };


    const dataa = {
        creator: "mr",
        styles: {
            headerStyle: {
              backgroundColor: '0A2006',
              color: "FFFFFF",

              border: {
                full: {
                  color: "53354A",
                },
            }
            },
          },
        sheet: [
            {
                headerStyleKey: "headerStyle",
                headerHeight: 120,
                images: [
                    {
                        url: Logo,
                        from: "A1",
                        to: "B1",
                        type: "two",
                    },
                ],
                headers: [
                    { label: "N", text: "", size: 5},
                    { label: "Competidor", text: "", size: 25},
                    { label: "Cavalo", text: "", size: 25},
                    { label: "Tempo", text: "", size: 12},
                    { label: "Faltas", text: "", size: 7},
                    { label: "Acréssimo", text: "", size: 12},
                    { label: "Tempo_total", text: "", size: 12},
                    { label: "SAT", text: "", size: 5},
                    { label: "NCP", text: "", size: 5},
                ],
                data: [
                    { 
                        N: "N", 
                        Competidor:"Competidor",
                        Cavalo: "Cavalo",
                        Tempo: "Tempo" ,
                        Faltas: "Faltas" ,
                        Acréssimo: "Acréssimo" ,
                        Tempo_total: "Tempo total" ,
                        SAT: "SAT" ,
                        NCP: "NCP" 
                    },

                    { 
                        N: "N", 
                        Competidor:"Competidor",
                        Cavalo: "Cavalo",
                        Tempo: "Tempo" ,
                        Faltas: "Faltas" ,
                        Acréssimo: "Acréssimo" ,
                        Tempo_total: "Tempo total" ,
                        SAT: "SAT" ,
                        NCP: "NCP" 
                    },
                ],
            },
        ],
    };

    generateExcel(dataa);

    console.log(data)
}