import express from "express"
const server = express();
server.listen(4000);

const today = new Date().toLocaleDateString();  

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];

function isHoliday(){
    for(let i = 0; i < holidays.length; i++){
        if(today === holidays[i].date){
            return(`Sim, hoje é ${holidays[i].name}.`);
        }
    }
    return("Não é feriado");
}

function holidaysList(month){
    let holidaysList = [];
    for(let i = 0; i < holidays.length; i++){
        const list = holidays[i].date.split("/");
        if(list[0] === month){
            holidaysList.push(holidays[i].name);
        }
    }

    if(holidaysList.length === 0){
        return("Não há feriados nesse mês")
    } else {
        return(holidaysList);
    }
}

server.get("/holidays", (request, response) => {    
    response.send(holidays);
})

server.get("/is-today-holiday", (request, response) => {
    const isTodayHoliday = isHoliday();
    response.send(isTodayHoliday);
})

server.get("/holidays/:month", (request, response) => {
    const month = request.params.month;
    const listOfHolidays = holidaysList(month);
    response.send(listOfHolidays);
})