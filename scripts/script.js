/*
    JavaScript for calculator project for the odin project (TOP)
*/
const container = document.querySelector("#container");
const flexContainer = document.createElement("div");
flexContainer.id = "flex";
const inputHolder = document.createElement("input");
const outputHolder = document.createElement("div");
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
let string = "";
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
        if(input === "="){
            let ans = calculateAnswerFromInfixToPostfix(string);
            outputHolder.innerHTML(ans)
        }
        string += input;
    });
});
// convert from infix to postfix, or reverse polish notation (rpn)
// use this to solve the calculation problems

// function to see if the string is a numeric
isNumeric = function(str){
    return !isNaN(parseFloat(str)) && isFinite(str);
}
// make the rpn string an array
makeArray = function(postfix){
    const arr = [];
    let current = "";
    console.log("postfix is " + postfix)
    for(let i = 0; i < postfix.length; i++){
        const c = postfix.charAt(i);
       console.log("c is " + c);
        if(isNumeric(c)){
            console.log("current is " + current);
            current += c;
        } else {
            if(current !== ""){
                console.log("current should be changing... from this " + current);
                arr.push(current);
                current = "";
                console.log("current should be nothing... " + current);
            }
            arr.push(c);
        }
    }
    console.log("arr is " + arr);
    return arr;
}
function solvePostfix(arr){
    const stack = [];
    let a;
    let b;
    for(let st of arr){
        switch(st){
            case "*":
                stack.push(stack.pop() * stack.pop());
                break;
            case "+":
                stack.push(stack.pop() + stack.pop());
                break;
            case "/":
                a = stack.pop();
                b = stack.pop();
                stack.push(b / a);
                break;
            case "-":
                a = stack.pop();
                b = stack.pop();
                stack.push(b - a);
                break;
            default:
                stack.push(parseFloat(st));
        }
    }
    return stack.pop();
}
// according to order of operations, certain operators get a higher precedence and if these are associative with right or left
// as this is only with the four main operators these are all left, but ^ would be right with a precedence higher than mult/div for example
this.calculateAnswerFromInfixToPostfix = function(infix){
    let outputQueue = "";
    const operatorStack = [];
    const operators = {
        "*":{
            precedence: 3,
            associativity: "left"
        },
        "/":{
            precedence: 3,
            associativity: "left"
        },
        "+":{
            precedence: 2,
            associativity: "left"
        },
        "-":{
            precedence: 2,
            associativity: "left"
        }
    }
    // remove white space
    infix = infix.replace(/\s+/g, "");
    // get length of shortened string
    const len = infix.length;
    // shunting yard algorithim
    for(let i = 0; i < len; i++){
        console.log("operatorsStack length is " + operatorStack.length);
        let token = infix[i];
        if(isNumeric(token)){
                while(isNumeric(infix[i+1])){
                i++;
                token += infix[i];
            }
            outputQueue += token + " ";
        } else if("*/+-".indexOf(token) !== -1){
            console.log("token is " + token);
            let o1 = token;
            let o2 = operatorStack[operatorStack.length -1];
            console.log("o2 is " + o2);
            while("*/+-".indexOf(o2) !== -1 && (
            (operators[o1].associativity === "left" && 
            operators[o1].precedence <= operators[o2].precedence))){
                console.log("it entered the while loop");
                outputQueue += operatorStack.pop() + " ";
                console.log("and now o2 is " + o2);
            }
            console.log("o1 is " + o1);
            operatorStack.push(o1);
            console.log("operatorStack is " + operatorStack);
        } else if(token === "("){
            operatorStack.push(token);
        } else if(token === ")"){
            while(operatorStack[operatorStack.length-1] !== "("){
                outputQueue += operatorStack.pop();
            }
            // remove the "("
            operatorStack.pop();
        }
        while(operatorStack.length > 0){
            outputQueue += operatorStack.pop() + " ";
        }
    }
    const rpn =  makeArray(outputQueue);
    const ans = solvePostfix(rpn);
    return ans;
}
const testNumber = "5 * 2 + (33 - 2) / 3 =";
console.log(testNumber);
console.log(calculateAnswerFromInfixToPostfix(testNumber))
container.appendChild(flexContainer);