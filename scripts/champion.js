const ChampionsRarity = new Map ([
    [1, '⚪'],
    [2, '🟢'],
    [3, '🔵'],
    [4, '🟣'],
    [5, '🟠']
])

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
        return ChampionsRarity.get(this.tierLvl);
    }

}

module.exports = Champion;