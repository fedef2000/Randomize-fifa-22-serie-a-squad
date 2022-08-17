const excelToJson = require('convert-excel-to-json')
const fs = require("fs");


//CONFIG : per aggiungere o togliere giocatori basta solo aggiornare l'array di nomi qui sotto
//---------------------
const nomi = ['Fede','Pappa','Vinci','Andre','Miky','Suro','Tommy']
//---------------------
const giocatori = nomi.map((e)=>{return {'nome':e,squadra:[]}}) //array che contiene oggetti con due chiavi: nome (del giocatore) e squadra (array)

const { Tutti: data } = excelToJson({ //importo i giocatori dal file xlsx 
    sourceFile: './data.xlsx',
    header:{
        rows: 2 //salto le prime due linee del file
    },
    sheets: ['Tutti'], //importo il foglio 'Tutti'
    columnToKey: { //assegno una chiave alle colonne che mi interessano 
        B: 'ruolo',
        D: 'nome',
        E: 'squadra',
        F: 'quotazione'
    }
})

/*creo 4 array per separare i giocatori in base ai ruoli
TODO refactoring: altra possibile soluzione: 
Nel file excel esistono i fogli Portieri, Difensori, Centrocampisti, Attaccanti quindi si potrebbe importarli direttamente in 4 array
*/
let Portieri = []
let Difensori = []
let Centrocampisti = []
let Attaccanti = []

data.forEach((e,i) => {
    if(e.quotazione > 3 && e.ruolo !== 'P'){ //se un giocatore non è un portiere deve avere quotazione più alta di 3 così selezioni solo giocatori non della primavera, per i portieri invece vanno bene anche quelli con quotazione 1
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

giocatori.forEach((giocatore)=> {
    //portieri
    for(let j = 0; j<3; j++){
        let index = Math.floor((Math.random()*Portieri.length)) 
        giocatore.squadra.push(Portieri[index])
        Portieri.splice(index,1)
    }
    //difensori
    for(let j = 0; j<8; j++){
        let index = Math.floor((Math.random()*Difensori.length)) 
        giocatore.squadra.push(Difensori[index])
        Difensori.splice(index,1)
    }
    //Centrocampisti
    for(let j = 0; j<8; j++){
        let index = Math.floor((Math.random()*Centrocampisti.length)) 
        giocatore.squadra.push(Centrocampisti[index])
        Centrocampisti.splice(index,1)
    }
    //attaccanti
    for(let j = 0; j<6; j++){
        let index = Math.floor((Math.random()*Attaccanti.length)) 
        giocatore.squadra.push(Attaccanti[index])
        Attaccanti.splice(index,1)
    }
    //controllo che ci siano abbastanza giocatori
    if(Portieri.length === 0 || Difensori.length === 0 || Centrocampisti.length === 0 || Attaccanti.length === 0){
        throw console.error('non ci sono abbastanza giocatori');
    }
    
})

//scrivo un file json con l'array di tutti i giocatori e delle relative squadre
fs.writeFile('./React_website/src/squadre.json', JSON.stringify(giocatori, null, '\t'), (error) => {
   if (error) throw error
   else console.log('squadre create con successo!')
})
