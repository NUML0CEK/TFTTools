const Pool = require('./scripts/pool');
const Shop = require('./scripts/Shop');
const RARITY = require('./config/rarity');

const Simulation = require('./scripts/simulation');
const RollingSimulator = require('./scripts/rollingSimulator');

// function printRoll(roll) {
//     let rollString = "";
//     for ([champion, _, _] of roll) {
//         rollString += champion.champion.getRarity() + ' ' + champion.champion.name + ' ';
//     }
//     console.log(rollString);
// }

// let myShop = new Shop();
// myShop.setupPools();
// myShop.changeLevel(10);
// const roll = myShop.getRoll();
// printRoll(roll);

let myRollingSimulator = new RollingSimulator();
myRollingSimulator.start();


let championTier = 3;
let championName = 'Taric';
let shopLvl = 7;
let boughtChampions = 0;
let sameTierBoughtChampionsNumber = 0; // full lvl3 tier pool contains 234 championUnits. This pool should contain 164 - 11 = 153 dummies and 11 Tarics.
let golds = 50;
let mySimulation = new Simulation(championTier, championName, shopLvl, boughtChampions, sameTierBoughtChampionsNumber, golds);
let res = mySimulation.analyzeRollsToGetNumberOfChampions(6, 5000);
console.log(res);

// mySimulation.pool.printPool();
// mySimulation.pool.printUnits();


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


