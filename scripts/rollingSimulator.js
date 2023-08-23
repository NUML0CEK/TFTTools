const Shop = require('./Shop');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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
        for (const [champion, pool, index] of roll) {
            rollString += champion.champion.getRarity() + ' ' + champion.champion.name + ' ';
        }
        console.log(rollString);
    }

    start() {
        rl.question('', (input) => {
            if (input === 'q') {
                console.log('GG!');
                rl.close();
                return;
            } else if (input.startsWith('buy ') ) {
                const substring = input.substring(4);
                for(const [champion, pool, index] of this.roll) {
                    if (substring === champion.champion.name) {
                        this.myShop.buyChampion(pool, index);
                        console.log(substring, 'bought!');
                    }
                }
            } else if (input.startsWith('stats ')) {
                const substring = input.substring(6);
                const tier = parseInt(substring);
                if (typeof tier === 'number') {
                    this.myShop.getPool(tier).printPool();
                    this.myShop.getPool(tier).printUnits();
                }
            } else if (input.startsWith('lvl ')){
                const substring = input.substring(4);
                const lvl = parseInt(substring);
                if (typeof lvl === 'number') {
                    this.changeLvl(lvl);
                }
            } else {
                this.roll = this.myShop.getRoll();
                this.printRoll(this.roll);
            }
            this.start();
        })
    }
}




module.exports = RollingSimulator;