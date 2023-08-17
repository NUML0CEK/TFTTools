class ShopOdds {
    constructor(tier1, tier2, tier3, tier4, tier5) {
        this.tier1 = tier1;
        this.tier2 = tier2;
        this.tier3 = tier3;
        this.tier4 = tier4;
        this.tier5 = tier5;
    }
}
  
const SHOP_ODDS_TABLE = {
    LEVEL_1: new ShopOdds(100, 0, 0, 0, 0),
    LEVEL_2: new ShopOdds(100, 0, 0, 0, 0),
    LEVEL_3: new ShopOdds(75, 25, 0, 0, 0),
    LEVEL_4: new ShopOdds(55, 30, 15, 0, 0),
    LEVEL_5: new ShopOdds(45, 33, 20, 2, 0),
    LEVEL_6: new ShopOdds(25, 40, 30, 5, 0),
    LEVEL_7: new ShopOdds(19, 30, 35, 15, 1),
    LEVEL_8: new ShopOdds(16, 20, 35, 25, 4),
    LEVEL_9: new ShopOdds(9, 15, 30, 30, 16),
    LEVEL_10: new ShopOdds(5, 10, 20, 40, 25),
    LEVEL_11: new ShopOdds(1, 2, 12, 50, 35),
};

module.exports = SHOP_ODDS_TABLE;