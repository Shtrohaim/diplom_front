const MONTH : { [key: string] :string } = { 
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
}

function getDate (strDate : string) : Date {
    let oldMonth = "" as string;
    let oldDay = "" as string;
    let oldYear = "" as string;
    if(strDate.trim().split(" ")[1] === undefined){
        oldMonth = strDate.slice(3, 6)
        oldDay = strDate.slice(0, 2)
        oldYear = strDate.slice(strDate.length - 4, strDate.length)
    }else{
        oldMonth = strDate.replace(/^ +| +$|( ) +/g,"$1").split(" ")[1].slice(0, 3)
        oldDay = strDate.replace(/^ +| +$|( ) +/g,"$1").split(" ")[0]
        oldYear = strDate.replace(/^ +| +$|( ) +/g,"$1").split(" ")[2]
    }
    oldMonth = oldMonth.charAt(0).toUpperCase() + oldMonth.slice(1);
    if(oldMonth === "Май"){
        oldMonth = "Мая"
    }
    return new Date(`${oldYear}-${MONTH[oldMonth]}-${oldDay}`) 
}

export function getRuShortMonth(strDate : string) : string {
    const date = getDate(strDate)
    return date.toLocaleString('ru', { month: 'short' }).replace(/\./gi, "");
}

export function getDayGeneralFormat(strDate : string) : number {
    const date = getDate(strDate)
    return date.getDate()
}