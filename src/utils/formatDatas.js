export function FormatCategory(category){
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

export function FormatProof(proof){
    const Proofs = {
        seis_balizas: "Seis Balizas",
        tres_tambores: "Três Tambores",
        maneabilidade: "Maneabilidade",
    } 
    return(Proofs[proof])
};

export function FormatStatus(status){
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

export function FormatDate(data){
    const originalString = data;
    const [datePart] = originalString.split(' ');
    const [year, month, day] = datePart.split('-');

    const formattedDate = `${day}/${month}/${year}`;

    return(formattedDate);
};

export function FormatTimer(num){

    let formattedNum = num.toFixed(3);
  
    let [integerPart, decimalPart] = formattedNum.split(".");
  
    integerPart = integerPart.padStart(3, "0");
  
    return `${integerPart}.${decimalPart}`;
};

export function calculateAge(date){
    const today = new Date();
    const born = new Date(date);

    let age = today.getFullYear() - born.getFullYear();
    const month = today.getMonth() - born.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
        age--;
    }

    if (!age) {
        return ('')
    }

    return (age)
};

export function calculateHorseAge (date){
    const today = new Date();
    const born = new Date(date);

    let years = today.getFullYear() - born.getFullYear();
    let months = today.getMonth() - born.getMonth();
    let days = today.getDate() - born.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        const lastDayOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += lastDayOfPreviousMonth;
    }

    const totalMonths = (years * 12) + months;
    const totalDays = days;

    if (totalMonths === 0 && totalDays === 0) {
        return '';
    }

    return `${totalMonths} meses e ${totalDays} dias`;
};