// Basic math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => (b === 0 ? "Error: Division by zero" : a / b);
const multiply = (a, b) => a * b;

// Variables for storing the first number, second number, operator, and display state
let numberOne = null;
let numberTwo = null;
let operator = null;
let shouldResetDisplay = false;

// Function to perform the calculation based on the operator
function operate(numberOne, numberTwo, operator) {
    const operations = {
        '+': add,
        '-': subtract,
        'x': multiply,
        '/': divide,
    };
    return operations[operator](numberOne, numberTwo);
}

// Variables + function to update the display
let displayValue = '0';
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

// Function to handle number input
function appendNumber(value) {
    if (shouldResetDisplay) {
        displayValue = value;
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
    updateDisplay();
}

document.querySelectorAll('button.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

// Function to handle operator input
function appendOperator(op) {
    if (numberOne !== null && operator !== null) {
        numberTwo = parseFloat(displayValue);
        numberOne = operate(numberOne, numberTwo, operator);
        displayValue = `${numberOne}`;
        updateDisplay();
    } else {
        numberOne = parseFloat(displayValue);
    }
    operator = op;
    shouldResetDisplay = true;
}

document.querySelectorAll('button.operator').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.textContent));
});

// Function to handle the "=" button click
function calculate() {
    if (numberOne !== null && operator !== null) {
        numberTwo = parseFloat(displayValue);
        displayValue = `${operate(numberOne, numberTwo, operator)}`;
        updateDisplay();
        numberOne = parseFloat(displayValue);
        operator = null;
        shouldResetDisplay = true;
    }
}
document.querySelector('button.equals').addEventListener('click', calculate);

// Clear display function
function clearDisplay() {
    displayValue = '0';
    numberOne = null;
    numberTwo = null;
    operator = null;
    updateDisplay();
}

document.querySelector('button.clear').addEventListener('click', clearDisplay);

// Function to change the sign of the most recent number
function changeSign() {
    displayValue = displayValue.charAt(0) === '-' ? displayValue.substring(1) : `-${displayValue}`;
    updateDisplay();
}

document.querySelector('button.change-sign').addEventListener('click', changeSign);

// Function to calculate the percentage of two numbers

