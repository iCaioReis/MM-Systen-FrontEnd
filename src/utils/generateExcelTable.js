import { FormatProof, FormatCategory } from './formatDatas';
import ExcelJS from 'exceljs';

import Logo from '/logo01.png'

export function generateExcelTable(data) {
    console.log(data)

    async function createAndDownloadExcelFile() {
        const logoImage = await fetch(Logo).then(res => res.arrayBuffer());

        const workbook = new ExcelJS.Workbook();


        data.proofs.map((proof) => {
            proof.categories.map((categorie) => {
                const worksheet = workbook.addWorksheet(`${FormatProof(proof.name)} - ${FormatCategory(categorie.name)}`);

                const titleRow = worksheet.getRow(1);
                titleRow.getCell(2).value = data.name;
                worksheet.mergeCells('B1:H1');

                titleRow.getCell(2).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'ff0a2006' }
                };
                titleRow.getCell(1).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'ff0a2006' },
                };

                titleRow.height = 50;

                worksheet.getRow(1).eachCell(cell => {
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                    cell.font = {
                        color: { argb: 'FFFFFFFF' },
                        bold: true,
                        size: 16
                    };
                });

                worksheet.columns = [
                    { header: '', key: 'id', width: 12 },
                    { header: 'Competidor', key: 'competitor_name', width: 40 },
                    { header: 'Cavalo', key: 'horse_name', width: 40 },
                    { header: 'Tempo', key: 'time', width: 8 },
                    { header: 'Faltas', key: 'fouls', width: 10 },
                    { header: 'Acréssimo', key: 'time_acress', width: 10 },
                    { header: 'total_time', key: 'total_time', width: 10 },
                    { header: data.name, key: 'points', width: 10, alignment: { horizontal: 'center' } },
                ];
                const header = worksheet.addRow({ id: "Classificação", competitor_name: "Competidor", horse_name: "Cavalo", time: "Tempo", fouls: "Faltas", time_acress: "Acréssimo", total_time: "Tempo Total", points: "Pontuação" });
                header.height = 20; 
                // Adicionar imagem
                
                const imageId = workbook.addImage({
                    buffer: logoImage,
                    extension: 'png',
                });

                worksheet.addImage(imageId, {
                    tl: { col: 0, row: 0 },  // Top left position
                    ext: { width: 190, height: 65 }  // Dimensões da imagem
                });


                categorie.competitors.map((competitor, index) => {
                    const classification = 
                        competitor.valid == true ? `${index + 1} º Colocado`
                        : competitor.SAT == 1 ? "SAT"
                        : competitor.NCP == 1 ? "NCP"
                        : "DESCARTADO"

                    worksheet.addRow({ 
                        id: classification , 
                        competitor_name: competitor.competitor_name, 
                        horse_name: competitor.horse_name, 
                        time: competitor.time, 
                        fouls: competitor.fouls || "", 
                        time_acress: competitor.fouls && `${(Number(competitor.fouls) * 5).toFixed(2)} s`, 
                        total_time: competitor.total_time, 
                        points: competitor.points 
                    });
                })

                worksheet.eachRow((row, rowIndex) => {
                    row.eachCell((cell, colIndex) => {
                      cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                      };
                    });
                  });
            })
        })
        // Gerar o arquivo para download
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);

        // Criar um link para download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${data.name}.xlsx`;
        link.click();

        // Limpar o objeto URL após o download
        URL.revokeObjectURL(url);
    }

    createAndDownloadExcelFile();
}