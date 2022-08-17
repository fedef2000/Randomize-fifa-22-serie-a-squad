const excelToJson = require('convert-excel-to-json')

const { Tutti: data } = excelToJson({
    sourceFile: './data.xlsx',
    header:{
        rows: 2
    },
    sheets: ['Tutti'],
    columnToKey: {
        B: 'ruolo',
        D: 'nome',
        E: 'squadra',
        F: 'quotazione'
    }
})

let Portieri = []
let Difensori = []
let Centrocampisti = []
let Attaccanti = []

data.forEach((e,i) => {
    if(e.quotazione > 2 && e.ruolo !== 'P'){
        if(e.ruolo === 'D'){
            Difensori.push(e)
        }else if(e.ruolo === 'C'){
            Centrocampisti.push(e)
        }else if(e.ruolo === 'A'){
            Attaccanti.push(e)
        }
    }else{
        if(e.ruolo === 'P'){
            Portieri.push(e)
        }
    }
})

//Per selezionare il ruolo basta cambiare l'array Portiere nelle due linee sotto
let index = Math.floor((Math.random()*Portieri.length)) 
console.log(Portieri[index])