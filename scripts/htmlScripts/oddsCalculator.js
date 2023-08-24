import {Simulation} from '../simulation.js';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function validateFormElement(element) {
    let value = element.value;
    let numberValue = parseInt(value);
    if (value === "" || isNaN(numberValue)) {
        element.closest(".field").classList.add("error");
        return false;
    } else {
        element.closest(".field").classList.remove("error");
        return true;
    }
}

function createChart(svgChart, chartID, data, axesNames) {
        const width = 300;
        const height = 250;
        const margin = { top: 45, right: 0, bottom: 40, left: 45 };

        const xScale = d3
            .scaleBand()
            .domain(data.map(d => d.label.toString()))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        let id = '#' + chartID;
        svgChart = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Vykreslete nový graf
        svgChart.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => xScale(d.label.toString()))
            .attr("y", (d) => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - margin.bottom - yScale(d.value))
            .attr("fill", 'rgb(45, 235, 144)');

        svgChart
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svgChart
            .append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        svgChart.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .attr("fill", "white")
            .text(axesNames[0]);

        svgChart.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", height - 220)
            .attr("x", 75)
            .attr("fill", "white")
            .text(axesNames[1]);

        // svgChart.append("text")
        //     .attr("x", width / 2)
        //     .attr("y", height + margin.top + 20)
        //     .style("text-anchor", "middle")
        //     .text(axesNames[0]);
          
        // svgChart.append("text")
        //     .attr("x", -(height / 2))
        //     .attr("y", -margin.left)
        //     .attr("transform", "rotate(-90)")
        //     .style("text-anchor", "middle")
        //     .text(axesNames[1]);

        return svgChart;
}

function getData( data ) {
    const rollData = [...data[0].entries()].map(([key, value]) => ({
        label: key,
        value: value,
    }));

    const oddData = [...data[1].entries()].map(([key, value]) => ({
        label: key,
        value: value,
    }));
    
    return [rollData, oddData];
}


document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calcButton");
    let svgRollChart, svgOddChart;

    calculateButton.addEventListener("click", function() {
        const tierElement = document.getElementById("tier");
        const shopLvlElement = document.getElementById("shopLvl");
        const goldElement = document.getElementById("gold");
        const tierChampionsBoughtElement = document.getElementById("tierChampionsBought");
        const championBoughtElement = document.getElementById("championsBought");

        let validTable = [];
        validTable.push(validateFormElement(tierElement));
        validTable.push(validateFormElement(shopLvlElement));
        validTable.push(validateFormElement(goldElement));
        validTable.push(validateFormElement(tierChampionsBoughtElement));
        validTable.push(validateFormElement(championBoughtElement));
        for (let valid of validTable) {
            if (!valid) {
                console.log('not valid!')
                return;
            }
        }
        console.log('valid', validTable)

        let tier = parseInt(tierElement.value);
        let shopLvl = parseInt(shopLvlElement.value);
        let gold = parseInt(goldElement.value);
        let tierChampionsBought = parseInt(tierChampionsBoughtElement.value);
        let championBought = parseInt(championBoughtElement.value);

        const mySimulation = new Simulation(tier, shopLvl, championBought, tierChampionsBought, gold);
        let output = mySimulation.analyzeRollsToGetNumberOfChampions(6, 5000);
        if (output === "LOW LEVEL") {
            shopLvlElement.closest(".field").classList.add("error");
            return;
        }
        

        console.log(output);

        let [rollData, oddData] = getData(output);
        console.log(rollData, oddData);

        if (svgRollChart) {
            svgRollChart.remove();
        }
        svgRollChart = createChart(svgRollChart, 'rollChart', rollData, ['champion number', 'roll number']);

        if (svgOddChart) {
            svgOddChart.remove();
        }
        svgOddChart = createChart(svgOddChart, 'oddChart', oddData, ['champion number', 'probability']);
    })
})
