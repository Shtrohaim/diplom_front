/* eslint-disable @typescript-eslint/no-explicit-any */
const MONTH = { 
    "Янв" : "01",
    "Фев" : "02",
    "Мар" : "03", 
    "Апр" : "04", 
    "Мая" : "05", 
    "Июн" : "06", 
    "Июл" : "07", 
    "Авг" : "08", 
    "Сен" : "09", 
    "Окт" : "10", 
    "Ноя" : "11", 
    "Дек" : "12"
} as any

function getDate (strDate : string) : Date {
    let oldMonth = strDate.split(" ")[1].slice(0, 3)
    oldMonth = oldMonth.charAt(0).toUpperCase() + oldMonth.slice(1);
    if(oldMonth === "Май"){
        oldMonth = "Мая"
    }

    return new Date(`${strDate.split(" ")[2]}-${MONTH[oldMonth]}-${strDate.split(" ")[0]}`) 
}

export function getRuShortMonth(strDate : string) : string {
    const date = getDate(strDate)
    return date.toLocaleString('ru', { month: 'short' }).replace(/\./gi, "");
}

export function getDayGeneralFormat(strDate : string) : number {
    const date = getDate(strDate)
    return date.getDate()
}