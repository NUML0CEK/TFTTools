class ShopOdds {
    constructor(tier1, tier2, tier3, tier4, tier5) {
        this.odds = new Map([
            [1, tier1],
            [2, tier2],
            [3, tier3],
            [4, tier4],
            [5, tier5]
        ])
    }
}

export const SHOP_ODDS_TABLE = new Map([
    [1, new ShopOdds(100, 0, 0, 0, 0)],
    [2, new ShopOdds(100, 0, 0, 0, 0)],
    [3, new ShopOdds(75, 25, 0, 0, 0)],
    [4, new ShopOdds(55, 30, 15, 0, 0)],
    [5, new ShopOdds(45, 33, 20, 2, 0)],
    [6, new ShopOdds(25, 40, 30, 5, 0)],
    [7, new ShopOdds(19, 30, 35, 15, 1)],
    [8, new ShopOdds(16, 20, 35, 25, 4)],
    [9, new ShopOdds(9, 15, 30, 30, 16)],
    [10, new ShopOdds(5, 10, 20, 40, 25)],
    [11, new ShopOdds(1, 2, 12, 50, 35)],
]);