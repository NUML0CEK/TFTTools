import {generateRandomNumberInRange} from './generator.js';
import {Pool} from './pool.js';
import {SHOP_ODDS_TABLE} from '../config/shopOdds.js';

export class Shop {
    constructor() {
        this.level = 1;
        this.pools = [];
    }

    setupPools() {
        for (let i = 0; i < 5; i++) {
            let pool = new Pool(i+1);
            pool.setChampions();
            pool.setUnits();
            this.pools.push(pool);
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


            let champions = [];
            for (const index of unitIndexes) {
                let tmpChampion = this.getPool(tier).getChampion(index);
                champions.push([tmpChampion, this.getPool(tier), index]);
            }
            championListOfGivenTier.set(tier, champions);
        }


        // get result in the right order
        let res = [];
        for (const tier of rollTiers) {
            res.push(championListOfGivenTier.get(tier).shift());
        }
        return res;
    }

    buyChampion(pool, index) {
        pool.removeChampionByIndex(index);
    }
}