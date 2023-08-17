const Pool = require('./scripts/pool');
const Shop = require('./scripts/Shop');
const RARITY = require('./config/rarity');

// let myPool = new Pool(1);
// myPool.printPool();
// myPool.setChampionPoolCount("Maokai", 1);
// myPool.printPool();
// myPool.printUnits();
let myShop = new Shop();

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


let counter = 0;
let generateNumber = 100000;
let percentage = 50;
myShop.changeLevel(11);
for (let i = 0; i < generateNumber; i++) {
    if (myShop.generateTierLvl() === 4) {
        counter++;
    }
}
console.log('expected:', generateNumber/(100/percentage), 'real:', counter);