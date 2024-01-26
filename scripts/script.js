/*
    JavaScript for calculator project for the odin project (TOP)
*/
const container = document.querySelector("#container");
const flexContainer = document.createElement("div");
flexContainer.id = "flex";
const inputHolder = document.createElement("input");
const outputHolder = document.createElement("output");
const numberBox = document.createElement("div");
inputHolder.className = "holder";
outputHolder.className = "holder";
numberBox.id = "numberbox";
flexContainer.appendChild(inputHolder);
flexContainer.appendChild(outputHolder);
flexContainer.appendChild(numberBox);
for(let i = 1; i <=20; i++){
    const btn = document.createElement("button");
    btn.id = i;
    btn.className = "buttons";
    numberBox.appendChild(btn);
}

container.appendChild(flexContainer);
