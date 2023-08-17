const Pool = require('./scripts/pool');
const Shop = require('./scripts/Shop');
const RARITY = require('./config/rarity');

// let myPool = new Pool(1);
// myPool.printPool();
// myPool.setChampionPoolCount("Maokai", 1);
// myPool.printPool();
// myPool.printUnits();

let myShop = new Shop();
myShop.changeLevel(10);
const roll = myShop.getRoll();
for ([champion, _, _] of roll) {
    console.log(champion);
}


// for ( let i = 0; i < 11; i++ ) {
//     console.log('LEVEL', i+1);
//     myShop.changeLevel(i+1)
//     for (let j = 0; j < 100; j++) {
//         let hand = []
//         for (let k = 0; k < 5; k++) {
//             let tierLvl = myShop.generateTierLvl();
//             hand.push(RARITY.get(tierLvl));
//         }
//         console.log(hand.join(''));
//     }
// }


// console.log()
// console.log(myShop.changeLevel())