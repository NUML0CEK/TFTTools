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

    /**
     * Get pool with given tier
     */
    getPool(tier) {
        return this.pools[tier-1];
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

    /**
     * Get list of five champions with reference to them
     * @returns {[[champion, pool, index], [champion, pool, index], ...]}
     */
    getRoll() {
        let rollTiers = []
        const tiersOccurrences = new Map();
        for (let i = 0; i < 5; i++) {
            let tmpTier = this.generateTierLvl();
            rollTiers.push(tmpTier);
            
            if (tiersOccurrences.has(tmpTier)) {
                tiersOccurrences.set(tmpTier, tiersOccurrences.get(tmpTier) + 1);
            } else {
                tiersOccurrences.set(tmpTier, 1);
            }
        }
        
        const championListOfGivenTier = new Map();
        for (const [tier, count] of tiersOccurrences) {
            let unitIndexes = this.getPool(tier).getNumberOfUnitIndexes(count);
            console.log('unitIndexes', unitIndexes);


            let champions = [];
            for (const index of unitIndexes) {
                let tmpChampion = this.getPool(tier).getChampion(index);
                champions.push([tmpChampion, this.getPool(tier), index]);
            }
            championListOfGivenTier.set(tier, champions);
        }
        console.log('championListOfGivenTier', championListOfGivenTier);


        // get result in the right order
        let res = [];
        for (const tier of rollTiers) {
            res.push(championListOfGivenTier.get(tier).shift());
        }
        return res;
    }

    /**
     * Get the number of rolls until the champion was found in the pool
     * @returns {[rollNumber, index]} Number of rolls and index of founded champion
     */
    rollsToGetChampion(championName) {



        let rollNumber = 0;
        while (true) {
            rollNumber++;
            let indexes = this.getFiveUnitIndexes();
            for (let i = 0; i < 5; i++) {
                if (this.units[indexes[i]].champion.name === championName) {
                    return [rollNumber, indexes[i]];
                }
            }
        }
    }

}

module.exports = Shop;