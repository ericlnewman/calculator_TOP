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
            let ans = calculations(string);
            outputHolder.innerHTML(ans)
        }
        string += input;
    });
});
// conver from infix to pre or post fix
// use this to solve the calculation problems
/*
A way I figured out in java to convert a rpn to inflix and solve is:
public int rpn(String[] tokens){
    Stack<Integer> s = new Stack<>();
    int a;
    int b;
    for(String st : tokens){
        switch(st){
            case "*":
                s.add(s.pop() * s.pop());
                break;
            case "+":
                s.add(s.pop() + s.pop());
                break;
            case "/":
                a = s.pop();
                b = s.pop);
                s.add(b / a);
                break;
            case "-":
                a = s.pop();
                b = s.pop();
                s.add(b - a);
                break;
            default:
                s.add(Integer.parseInt(st));
        }

    }
    return s.pop();
}
*/
function calculations(input){
    // need to iterate over the string, first look for parentheses i.e. ( .... )
    // this is done first, if there is none, then find * or /  and do this left to right
    // then do the addition and or subtraction
    const arr = convertToArray(input);
    let i = 0;
    let ans = 0;
    while(i < arr.length){
        let st = 0;
        let en = 0;
        if(arr.find((e)=> e ==="(")){
            let start = startParentheses(arr);
            let end = endParentheses(arr);
            ans += parenthesesNumber(arr, start, end);
            st = start;
            en = end;
        }
        let num = getNumber(arr, i);
        let symbol = arr[num.length];
        if(symbol === "+" || symbol === "-" || 
            symbol === "*" || symbol === "/"){
            if(num.length + 1 != st){
                let num2 = getNumber(arr, num.length+1)
                ans += calculateBasedOnSymbol(symbol, num, num2);
                i+= num.length + num2.length + 1;
            } else {
                ans += calculateBasedOnSymbol(symbol, num, ans);
                 i = en;
            }
        }
        i++;
    }
    return ans;
        
}
// calculation functions:
function add(a, b){ return a + b; }
function subtract(a, b){ return a - b; }
function multiply(a, b){ return a * b; }
function divide(a, b){ return a / b; }
// convert the string to a char array
function convertToArray(str){
    const arr = [];
    for(let i = 0; i < str.length-1; i++){
        let l = str.charAt(i);
        if(l != " "){
            arr.push(l);
        }
    }
    return arr;
}
// number sorting functions
function startParentheses(arr){ return arr.findIndex((a)=> a === "("); };
function endParentheses(arr){ return arr.findIndex((a)=> a === ")"); };
function parenthesesNumber(arr, s, e){
    let a = getNumber(arr, s);
    let b = getNumber(arr, (e-a.length));
    let symbol = arr[a.length-1];
    return calculateBasedOnSymbol(symbol, a, b);
}
function getNumber(num, start){
    let s = "";
    for(let i = start; i < num.length; i++){
        // regex to find only 0-9
        if(num[i].match(/^\d/)){
            s += num[i];
        } else{
            break;
        }
    }
    return s;
}

function calculateBasedOnSymbol(symbol, a, b){
    let ans = 0;
    switch(symbol){
        case "+":
            ans += add(a,b);
            break;
        case "-":
            ans += subtract(a,b);
            break;
        case "*":
            ans += multiply(a,b);
            break;
        default:
        ans += divide(a,b);
    }
    return ans;
}/*
function getNum(){
    let ans = 0;
    for(let i = 0; i < input.length; i++){
        // parentheses
        if(input[i] === "(" || input[i] == /d/){
            let a = "";
    let count = 0;
     // get first number
    for(let j = i; j < input.length; j++){
        if(input[j] === "+" || input[j] === "-" || input[j] === "*" || input[j] === "/" || input[j] === " " || input[j] === ")"){
            count++;
            break;
        }
        a+=input[j];
        count++;
    }
    i+=count;
    // skip whitespace
    if(input[i] == " "){i++};
    // variable 
    let symbol = i;
    // skip symbol
    i++;
    //skip whitespace
    if(input[i] == " "){i++};
    let count1 = 0;
    let b = "";
    for(let j = i; j < input.length; j++){
        if(input[j] === "+" || input[j] === "-" || input[j] === "*" || input[j] === "/" || input[j] === " " || input[j] === ")"){
            count1++;
            break;
        }
        b+=input[j];
        count1++;
    }
    switch(input[symbol]){
        case "+":
            ans += add(a,b);
            break;
        case "-":
            ans += subtract(a,b);
            break;
        case "*":
            ans += multiply(a,b);
            break;
        default:
        ans += divide(a,b);
    }
        }
        return ans;
    }
}*/
container.appendChild(flexContainer);