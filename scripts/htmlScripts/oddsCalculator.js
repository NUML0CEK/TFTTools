// import  { Simulation } from '../simulation';

// function validateFormElement(element) {
//     let value = element.value;
//     let numberValue = parseInt(value);
//     if (value === "" || isNaN(numberValue)) {
//         element.closest(".field").classList.add("error");
//         return false;
//     } else {
//         element.closest(".field").classList.remove("error");
//         return true;
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     const calculateButton = document.getElementById("calcButton");
//     calculateButton.addEventListener("click", function() {
//         const tierElement = document.getElementById("tier");
//         const shopLvlElement = document.getElementById("shopLvl");
//         const goldElement = document.getElementById("gold");
//         const tierChampionsBoughtElement = document.getElementById("tierChampionsBought");
//         const championBoughtElement = document.getElementById("championsBought");

//         let validTable = [];
//         validTable.push(validateFormElement(tierElement));
//         validTable.push(validateFormElement(shopLvlElement));
//         validTable.push(validateFormElement(goldElement));
//         validTable.push(validateFormElement(tierChampionsBoughtElement));
//         validTable.push(validateFormElement(championBoughtElement));
//         for (let valid of validTable) {
//             if (!valid) {
//                 console.log('not valid!')
//                 return;
//             }
//         }
//         console.log('valid', validTable)

//         let tier = tierElement.value;
//         let shopLvl = shopLvlElement.value;
//         let gold = goldElement.value;
//         let tierChampionsBought = tierChampionsBoughtElement.value;
//         let championBought = championBoughtElement.value;

//         const mySimulation = new Simulation(tier, shopLvl, championBought, tierChampionsBought, gold);
//     })
// })



export class SMTH {
    constructor() {
        this.neco = 1;
    }
};
