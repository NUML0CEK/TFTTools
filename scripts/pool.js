const Champion = require('./champion');
const ChampionUnit = require('./championUnit');
const POOL_SIZES = require('../config/poolSizes');
const CHAMPION_NAMES = require('../config/championNames');

class Pool {
    constructor(tierLvl) {
        this.tierLvl = tierLvl;
        this.size = this.setSize();
        this.champions = this.setChampions();
        this.units = this.setUnits();
    }

    setSize() {
        return POOL_SIZES.get(this.tierLvl)*CHAMPION_NAMES.get(this.tierLvl).length;
    }

    setChampions() {
        let championArr = new Map()
        for ( const championName of CHAMPION_NAMES.get(this.tierLvl) ) {
            championArr.set(championName, new Champion(this.tierLvl, championName, POOL_SIZES.get(this.tierLvl)));
        }
        return championArr;
    }

    printPool() {
        console.log(this.tierLvl, "star Pool");
        for ( const [championName, champion] of this.champions) {
            let name = championName;
            while (name.length < 5) {
                name += " ";
            }
            console.log(champion.getRarity(), name, "\t" , champion.poolCount);
        }
        console.log();
    }

    setChampionPoolCount ( name, newCount) {
        const oldCount = this.champions.get(name).poolCount;
        if (newCount === oldCount) {
            return;
        } else if (newCount > oldCount) {
            let diff = newCount - oldCount;
            for (let i = 0; i < diff; i++) {
                this.addChampion(name);
            }
        } else {
            let diff = oldCount - newCount;
            for (let i = 0; i < diff; i++) {
                this.removeChampionByName(name);
            }
        }

        this.champions.get(name).setPoolCount(newCount);
    }

    setUnits() {
        const units = [];
        for ( const [_, champion] of this.champions) {
            for (let i = 0; i < POOL_SIZES.get(this.tierLvl); i++) {
                units.push(new ChampionUnit(champion));
            }
        }
        return units;
    }

    addChampion(name) {
        this.units.push(new ChampionUnit(this.champions.get(name)));
    }

    removeChampionByName(name) {
        for (let i = 0; i < this.units.length; i++) {
            if (this.units[i].champion.name === name) {
                this.units.splice(i, 1);
                break;
            }
        }
    }

    removeChampionByIndex(index) {
        this.units.splice(index, 1);
    }

    printUnits() {
        const formattedArray = [];
        for (let i = 0; i < this.units.length; i++) {
            formattedArray.push(this.units[i].champion.name);
        }
        console.log(formattedArray);
    }  
}

module.exports = Pool;