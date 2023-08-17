const Champion = require('./champion');
const POOL_SIZES = require('../config/poolSizes');
const CHAMPION_NAMES = require('../config/championNames');

class Pool {
    constructor(starLvl) {
        this.starLvl = starLvl;
        this.size = this.setSize();
        this.champions = this.setChampions();
        // this.units = this.setUnits();
    }

    setSize() {
        return POOL_SIZES.get(this.starLvl)*CHAMPION_NAMES.get(this.starLvl).length;
    }

    setChampions() {
        let championArr = new Map()
        for ( const championName of CHAMPION_NAMES.get(this.starLvl) ) {
            championArr.set(championName, new Champion(this.starLvl, championName, POOL_SIZES.get(this.starLvl)));
        }
        return championArr;
    }

    printPool() {
        console.log("|  ", this.starLvl, "star Pool", "      |");
        for ( const [championName, champion] of this.champions) {
            console.log("|  ", championName, "\t" , champion.poolCount, "  |");
        }
    }

    addChampion(champion) {

    }

    removeChampion(champion) {

    }

}

module.exports = Pool;