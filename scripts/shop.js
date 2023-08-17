// const Champion = require('./champion');
// const ChampionUnit = require('./championUnit');
// const POOL_SIZES = require('../config/poolSizes');
// const CHAMPION_NAMES = require('../config/championNames');

const generateRandomNumberInRange = require('./generator')
const SHOP_ODDS = require('../config/shopOdds');
const Pool = require('./pool');
const SHOP_ODDS_TABLE = require('../config/shopOdds');


class Shop {
    constructor() {
        this.level = 1;
        this.pools = [];
        for (let i = 0; i < 5; i++) {
            this.pools.push(new Pool(i+1));
        }
    }

    changeLevel(level) {
        if (level > 0 && level < 12) {
            this.level = level;
        }
    }

    generateTierLvl() {
        const number = generateRandomNumberInRange(1, 100)
        let counter = 0;
        const oddsTable = SHOP_ODDS_TABLE.get(this.level);
        for (let i = 0; i < 5; i++) {
            counter += oddsTable.odds.get(i+1);
            if (number <= counter) {
                return i + 1;
            }
        }
    }

}

module.exports = Shop;