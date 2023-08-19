const Shop = require('./shop');
const POOL_SIZES = require('../config/poolSizes');
const CHAMPION_NAMES = require('../config/championNames');
const Pool = require('./pool');
const generateRandomNumberInRange = require('./generator')


class PlaceHolderPool extends Pool{
    constructor(tier) {
        super();
        this.fullSizePoolChampionCount = 0;
        this.championsInThePool = 0;
        this.numberOfDummies = 0;
        this.tierLvl = tier;
    }

    setPlaceHolderPool(boughtChampions, sameTierBoughtChampionsNumber) {
        this.fullSizePoolChampionCount = this.getFullSizePoolChampionCount();
        this.championsInThePool = this.getRemainingNumberOfChampions(boughtChampions);
        this.numberOfDummies = this.fullSizePoolChampionCount - sameTierBoughtChampionsNumber - this.championsInThePool;
    }

    copyPool() {
        let newPool = new PlaceHolderPool(this.tierLvl);
        newPool.fullSizePoolChampionCount = this.fullSizePoolChampionCount;
        newPool.championsInThePool = this.championsInThePool;
        newPool.numberOfDummies = this.numberOfDummies;
        return newPool;
    }
}

class Simulation {
    constructor(championTier, championName, shopLvl, boughtChampions, sameTierBoughtChampionsNumber, gold) {
        this.shopLvl = shopLvl;
        this.gold = gold;

        this.pool = new PlaceHolderPool(championTier);
        this.pool.setPlaceHolderPool(boughtChampions, sameTierBoughtChampionsNumber);

        this.shop = new Shop();
        this.shop.changeLevel(shopLvl);
    }

    // Old implementation
    setupPool(championName, boughtChampions, sameTierBoughtChampionsNumber) {
        const fullSizePoolChampionCount = this.pool.getFullSizePoolChampionCount();
        const championsInThePool = this.pool.getRemainingNumberOfChampions(boughtChampions);
        const numberOfDummies = fullSizePoolChampionCount - sameTierBoughtChampionsNumber - championsInThePool;

        this.pool.addChampions(championName, championsInThePool);
        this.pool.fillUnitsWithDummies(numberOfDummies);
    }

    rollsAvailable() {
        return Math.floor(this.gold / 2);
    }

    matchesInRoll() {
        let matches = 0;
        for (let i = 0; i < 5; i++) {
            if (this.pool.tierLvl === this.shop.generateTierLvl()) {
                let number = generateRandomNumberInRange(1, this.pool.fullSizePoolChampionCount);
                if (number <= this.pool.championsInThePool) {
                    matches++;
                    this.pool.championsInThePool--;
                    this.pool.fullSizePoolChampionCount--;
                }
            }    
        }
        return matches;
    }

    rollsToGetNumberOfChampions(upperLimitOfChampions) {
        const oldPool = this.pool.copyPool();

        let foundedMatches = 0;
        let rollCount = 0;
        let matchesToRolls = new Map();
        let goldSpent = 0;
        let foundedMatchesWithGivenGold = 0;
        while(foundedMatches < upperLimitOfChampions) {
            rollCount++;
            goldSpent += 2;
            let oldMatches = foundedMatches;
            foundedMatches += this.matchesInRoll();
            for (let i = oldMatches; i < foundedMatches && i < upperLimitOfChampions; i++) {
                matchesToRolls.set(i+1, rollCount);
            }
            if (goldSpent <= this.gold) {
                foundedMatchesWithGivenGold = foundedMatches;
            }
        }

        this.pool = oldPool;
        return [matchesToRolls, foundedMatchesWithGivenGold];
    }

    addToMap(map1, map2) {
        for (const [key, value] of map2) {
            if (map1.has(key)) {
                map1.set(key, map1.get(key) + value );
            } else {
                map1.set(key, value);
            }
        }
        return map1;
    }

    getResult(matchesToRollsRes, numberOfTries, matchesTimes) {
        for (const [key, value] of matchesToRollsRes) {
            matchesToRollsRes.set(key, value / numberOfTries );
        }

        for (const [key, value] of matchesTimes) {
            matchesTimes.set(key, value*100/numberOfTries);
        }

        return [matchesToRollsRes,matchesTimes];
    }

    evaluateMatchesTimes(foundedMatchesWithGivenGold, matchesTimes, upperLimitOfChampions) {
        for (let i = 0; i < upperLimitOfChampions; i++) {
            if (i < foundedMatchesWithGivenGold) {
                matchesTimes.set(i+1, matchesTimes.get(i+1) + 1);
            }
        }
        return matchesTimes;
    }

    initializeMatchesTimes(upperLimitOfChampions) {
        let map = new Map ();
        for (let i = 0; i < upperLimitOfChampions; i++) {
            map.set(i+1, 0);
        }
        return map;
    }

    analyzeRollsToGetNumberOfChampions(upperLimitOfChampions, numberOfTries) {
        if (upperLimitOfChampions > this.pool.championsInThePool) {
            upperLimitOfChampions = this.pool.championsInThePool;
        }

        let matchesToRollsRes = new Map();
        let matchesTimes = this.initializeMatchesTimes(upperLimitOfChampions); // tracking number of times in which the needed amount of champions was found
        for (let i = 0; i < numberOfTries; i++) {
            const [matchesToRolls, foundedMatchesWithGivenGold] = this.rollsToGetNumberOfChampions(upperLimitOfChampions);
            matchesToRollsRes = this.addToMap(matchesToRollsRes, matchesToRolls);
            matchesTimes = this.evaluateMatchesTimes(foundedMatchesWithGivenGold, matchesTimes, upperLimitOfChampions);
        }
        return this.getResult(matchesToRollsRes, numberOfTries, matchesTimes);
    }

}

module.exports = Simulation;