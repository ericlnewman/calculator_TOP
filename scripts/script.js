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
                input = "( ";
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
                input = " )";
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
                inputHolder.value = "";
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
                input = " / ";
                break;
            case "16":
                input = " * ";
                break;
            case "17":
                input = " - ";
                break;
            case "18":
                input = " + ";
                break;
            case "19":
                input = " =";
                break;
            default:
                break;
        }
        inputHolder.value += input;
        if(input === " ="){
            let ans = calculation(inputHolder.value);
            outputHolder.innerHTML = ans
        }
    });
});
const calculation = (strInfix) =>{
    let rpn = shuntingYard(strInfix);
    let array = makeArray(rpn);
    let answer = solvePostfix(array);
    return answer;
};
// convert from infix to postfix, or reverse polish notation (rpn)
// use this to solve the calculation problems
// functional approach to shunting yard algorithim
shuntingYard = (infix) =>{
    // according to order of operations, certain operators get a higher precedence and if these are associative with right or left
    // as this is only with the four main operators these are all left, but ^ would be right with a precedence higher than mult/div for example
    const operations ={
        "+": 2,
        "-": 2,
        "*": 3,
        "/": 3
    };
    let peek = (element) => element[element.length-1];
    const stack = [];
    return infix.split("").reduce((output, token) =>{
        // test if the token is a number
        console.log("token is " + token);
        if(/\d/.test(token)){
            // see if it is a multidigit number
            output.currentNumber = output.currentNumber || "";
            output.currentNumber += token;
        } else {
            output = handleNumber(output);
            if(token in operations){
                while(peek(stack) in operations && operations[token] <= operations[peek(stack)])
                    output.push(stack.pop());
                stack.push(token);
            }
        }
        if(token == "("){
            stack.push(token);
        }
        if(token == ")"){
            while(peek(stack) != "(")
                output.push(stack.pop());
            // remove "("
            stack.pop();
        }
        return output;
    }, [])
    .concat(stack.reverse())
    .join(" ");

    function handleNumber(output){
        const number = parseFloat(output.currentNumber);
        if(!isNaN(number)){
            output.push(number);
        }
        output.currentNumber = "";
        return output;
    }
};
// make the rpn string an array
makeArray = function(postfix){
    const arr = [];
    console.log("postfix is " + postfix)
    for(let i = 0; i < postfix.length; i++){
        const c = postfix.charAt(i);
        if(c !== " "){
            if(/\d/.test(c)){
                let n = "";
                while(postfix.charAt(i) !== " "){
                    n+= postfix.charAt(i);
                    i++;
                }
                arr.push(n);
            } else{
                arr.push(c);
            }
        }
    }
    console.log("arr is " + arr);
    return arr;
}
// solve the array of rpn
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
};

container.appendChild(flexContainer);