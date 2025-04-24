


/* Vi bruker ES6 / ESNext (Ecmascript) standarden for å importere moduler.  */

/* PromtEngine representerer et sett med javascriptkode andre har skrevet, men som vi kan ta i bruk ved å laste ned pakken via npm */
import PromptSync from "prompt-sync";

/* det er en pakke som enklere lar oss hente brukerinput fra bruker via standard inputen til prosessen vår. Enkler enn hvis vi hadde gjort det i Node direkte.  */
/* For å kunne hente input fra brukeren må vi "starte"  prompting enginen vår. 

    vi passer også inn et config objekt.
        sigint: true betyr at vi tillater brukeren å stoppe programmet via standard commandline stop (ctrl+c på windows)*/
const prompt = PromptSync({sigint: true, echo: false});

/* Vi kan bruke promt enginen for å prompte brukeren vår for et navn. */
console.log("What is your name?");
const name = prompt("");

console.log(`your name is: ${name}`);

/* Nedenfor ser dere en implementasjon av rock/paper/scissors spillet i javascript.

Dette er en mer simplifisert utgave av spillet, blant annet finnes det ingen utgave av "uavgjort".
*/
const options = ["rock", "paper", "scissors"];

/* Her bruker vi et lite mattetriks via Math classen som eksisterer i standard javascript librariet, for å velte et tilfeldig tall mellom alle gyldige arrays i options arrayet vårt.

    Math.random() velger et tilfeldig tall mellom 0 og 1. vi ganger dette så med lengden på arrayet vårt.
    Vi wrapper det i en Math.floor() for å runde NED til nærmeste hele tall. */
const compChoice = options[Math.floor(Math.random() * options.length)]


/* Vi skal bruke en loop for å tvinge brukeren vår å velge et gyldig valg. Vi kan ha en variabel som tracker om brukeren har en truthy gyldig verdi, eller ikke.  */
let validUserChoice = false;

/* Vi kan bruke omvendt/not operatoren vår ! for å si at vår loop skal kjøre så lenge validUserChoice er false.  */
while (!validUserChoice)
{
    /* Vi console logger ut noen valg til brukeren.  */
    console.log("Choose either: ");
    console.log("1. Rock");
    console.log("2. Paper");
    console.log("3. Scissors");

    /* Vi henter så inn brukerens input. Legg merke til at vi putter brukerens input i validUserChoice, det vil si at nå er den også regnet som "truthy/sann". */
    validUserChoice = prompt("");

    /* Vi kan lage en avgreining i programmet vårt, som skjekker om brukeren har skrevet inn et tall. 
    Her chainer vi flere conditionals sammen, for å skjekke om validChoice er en gyldig index i options arrayet vårt.  */
    if (Number(validUserChoice) && Number(validUserChoice) <= options.length && Number(validUserChoice) > 0 && Number.isInteger(Number(validUserChoice)))
    {
        /* Hvis det er det, så henter vi ut verdien som ligger der. Legg merke til at vi bruker -1. Det er fordi siden vi presenterer Rock som 1, men vet at Rock lever i index 0 osv. */
        validUserChoice = options[Number(validUserChoice) - 1];

        /* Vi printer så ut spillerens og computeren sitt valg, og skjekker om de vant.  */
        console.log(`you chose: ${validUserChoice}`);
        console.log(`computer chose: ${compChoice}`);

        const win = checkIfChoice1HasWon(validUserChoice, compChoice);
        if (win) console.log("You won!");
        else console.log("You lost...");
        /* Siden validUserChoice fremdeles er "truthy" etter denne blokken er ferdig å kjøre, vil loopen avsluttes hvis denne grenen avsluttes her.  */
    }
    /* Denne grenen kjører kun hvis options arrayet vårt inneholder det brukern skrev. Legg merke til at vi bruker en hjelpemetode som eksisterer på strenger(tekst) i JS her, for å ignorere om brukeren skriver stor eller liten bokstav i valget sitt. */
    else if(options.includes(validUserChoice.toLocaleLowerCase()))
    {
        console.log(`you chose: ${validUserChoice}`);
        console.log(`computer chose: ${compChoice}`);

        const win = checkIfChoice1HasWon(validUserChoice, compChoice);
        if (win) console.log("You won!");
        else console.log("You lost...");
        /* Som over, siden validUserChoice fremdeles er "truthy" avsluttes loopen her. */
    }
    /* Hvis brukerne ikke har en valid input, kjører denne grenen.  */
    else
    {
        /* Vi logger en feilmelding til brukeren */
        console.log("please input a valid choice....");
        /* og passer på at validUserChoice er false, slik at loopen starter på nytt.  */
        validUserChoice = false;
    }
}

/* Dette er en simpel hjelpefunksjon som lar oss sammenligne de to verdiene, for å finne ut om brukern har vunnet eller ikke. 

    En utfordring til dere, vil være å refaktorisere denne funksjonen, slik at den tillater "uavgjort" Da må den kanskje returnere en annen verditype enn true/false, slik at dette kan skjekkes på utenfor funskjonen. */
function checkIfChoice1HasWon(choice1, choice2)
{
    /* Her bruker vi en switch case for å "pattern matche" på verdien av Choice1. 
    
        Det vil si vi setter opp et sett med "caser" som representerer mulige verdier av choice1, hvor hver case bare blir kjørt om choice1 har den verdien. */
    switch (choice1) {
        /* Denne kjører kun hvis choice1 har verdien rock.  */
        case "rock":
            if (choice2 === "scissors") return true;
            else return false;
        /* Denne kjører kun hvis choice1 har verdien scissors */
        case "scissors":
            if (choice2 === "paper") return true;
            else return false;
        /* Denne kjører kun hvis choice1 har verdien paper */
        case "paper":
            if (choice2 === "rock") return true;
            else return false;
        /* Det er alltid greit å ha med en default case i switch cases, i tilfellet vi får inn en verdi vi ikke egentlig kan håndtere. */
        default:
            return false;
    }
}