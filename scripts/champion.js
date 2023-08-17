const RARITY = require('../config/rarity');

class Champion {
    constructor(tierLvl, name, poolCount) {
        this.tierLvl = tierLvl;
        this.name = name;
        this.poolCount = poolCount;
    }

    setPoolCount ( newCount) {
        this.poolCount = newCount;
    }

    getRarity () {
        return RARITY.get(this.tierLvl);
    }
}

module.exports = Champion;