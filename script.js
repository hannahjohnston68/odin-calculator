//basic math functions
function add (a,b) {
    return a + b
}; 
function subtract (a,b){
    return a - b
};
function divide (a,b){ 
    if (b === 0) {
        return "Error: Division by zero is not allowed."
    } else {
        return a / b
    }
};
function multiply (a,b){
    a * b
}; 

// create variables for two numbers and operator and function to calculate sum  
let numberOne;
let numberTwo;
let operator;

function operate(numberOne, numberTwo, operator){
    if (operator === "+") {
        return add(numberOne,numberTwo);
    } else if (operator === "-") {
        return subtract(numberOne,numberTwo);
    } else if (operator === "*") {
        return multiply(numberOne,numberTwo);
    } else if (operator === "/") {
        return divide(numberOne,numberTwo);
    }
}