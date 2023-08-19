const Shop = require('./Shop');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Zadejte něco: ', (userInput) => {
    // Vstup od uživatele je uložen v proměnné userInput
    console.log('Uživatel zadal: ' + userInput);
  
    // Ukončení čtení vstupu
    rl.close();
  });

class RollingSimulator {
    constructor() {
        this.myShop = new Shop();
        this.myShop.setupPools();
    }

    changeLvl(lvl) {
        this.myShop.changeLevel(lvl);
    }

    printRoll(roll) {
        let rollString = "";
        for ([champion, _, _] of roll) {
            rollString += champion.champion.getRarity() + ' ' + champion.champion.name + ' ';
        }
        console.log(rollString);
    }

    start() { // nefunguje ...
        while(true) {

            rl.question('', (input) => {
                if (input === '') {
                    console.log('nic nebylo zadano');
                } else {
                    console.log(input);
                }

                rl.close();
            })


        }
    }

}

module.exports = RollingSimulator;