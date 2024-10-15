export function FormatCategory(category) {
    const Categories = {
        kids: "Kids",
        little: "Mirim",
        juvenile: "Juvenil",
        beginner: "Iniciante",
        female: "Feminino",
        adult: "Adulto",
        master: "Master",
        open: "Aberto"
    } 
    return(Categories[category])
};

export function FormatProof(proof) {
    const Proofs = {
        seis_balizas: "Seis Balizas",
        tres_tambores: "Três Tambores",
        maneabilidade: "Maneabilidade",
    } 
    return(Proofs[proof])
};

export function FormatStatus(status) {
    const Status = {
        active: "Ativo",
        inative: "Inativo",
        making_registrations: "Realizando inscrições",
        finished_inscriptions: "Encerradas inscrições",
        running: "Competição em Andamento",
        finished: "Finalizada"
    } 
    return(Status[status])
};

export function FormatDate(data) {
    const originalString = data;
    const [datePart] = originalString.split(' ');
    const [year, month, day] = datePart.split('-');

    const formattedDate = `${day}/${month}/${year}`;

    return(formattedDate);
};

export function FormatTimer(num) {

    let formattedNum = num.toFixed(3);
  
    let [integerPart, decimalPart] = formattedNum.split(".");
  
    integerPart = integerPart.padStart(3, "0");
  
    return `${integerPart}.${decimalPart}`;
};