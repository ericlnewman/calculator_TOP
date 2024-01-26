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
inputHolder.type = "text";
outputHolder.type = "number";
numberBox.id = "numberbox";
flexContainer.appendChild(inputHolder);
flexContainer.appendChild(outputHolder);
flexContainer.appendChild(numberBox);
// create buttons with for loop, and an array of each of them:
const arrayOfBtns = [];
for(let i = 0; i <= 19; i++){
    const btn = document.createElement("button");
    btn.id = i;
    btn.style.fontSize = "1.2rem";
    btn.className = "buttons";
    switch(i){
        case 0:
            btn.textContent = "(";
            break;
            case 1:
                btn.textContent = 7;
                break;
            case 2:
                btn.textContent = 4;
                break;
            case 3:
                btn.textContent = 1;
                break;
            case 4:
                btn.textContent = "CE";
                btn.style.color = "white";
                btn.style.backgroundColor = "rgb(163, 163, 163)";
                break;
            case 5:
                btn.textContent = ")";
                break;
            case 6:
                btn.textContent = 8;
                break;
            case 7:
                btn.textContent = 5;
                break;
            case 8:
                btn.textContent = 2;
                break;
            case 9:
                btn.textContent = 0;
                break;
            case 10:
                btn.textContent = "DEL";
                btn.style.color = "white";
                btn.style.backgroundColor = "rgb(173, 173, 173)";
                break;
            case 11:
                btn.textContent = 9;
                break;
            case 12:
                btn.textContent = 6;
                break;
            case 13:
                btn.textContent = 3;
                break;
            case 14:
                btn.textContent = ".";

                break;
            case 15:
                btn.textContent = "÷";
                break;
            case 16:
                btn.textContent = "x";
                
                break;
            case 17:
                btn.textContent = "-";
                break;
            case 18:
                btn.textContent = "+";
                break;
            case 19:
                btn.textContent = "=";
                btn.style.color = "white";
                btn.style.backgroundColor = "rgb(0, 103, 192)";
                break;
            default:
                break;        
    }
    arrayOfBtns.push(btn);
    numberBox.appendChild(btn);
}
// using the array, grab each element and add an event listener to it, assigning the variou numbers or symbols to go input
arrayOfBtns.forEach((element)=>{

    element.addEventListener("click", function(event){
        let input = 0;
        switch(element.id){
            case "0":
                input = "(";
                break;
            case "1":
                input = 7;
                break;
            case "2":
                input = 4;
                break;
            case "3":
                input = 1;
                break;
            case "4":
                input = "";
                break;
            case "5":
                input = ")";
                break;
            case "6":
                input = 8;
                break;
            case "7":
                input = 5;
                break;
            case "8":
                input = 2;
                break;
            case "9":
                input = 0;
                break;
            case "10":
                input = "";
                break;
            case "11":
                input = 9;
                break;
            case "12":
                input = 6;
                break;
            case "13":
                input = 3;
                break;
            case "14":
                input = ".";
                break;
            case "15":
                input = "/";
                break;
            case "16":
                input = "*";
                break;
            case "17":
                input = "-";
                break;
            case "18":
                input = "+";
                break;
            case "19":
                input = "=";
                break;
            default:
                break;
        }
        inputHolder.value += input;
    });
});

container.appendChild(flexContainer);
