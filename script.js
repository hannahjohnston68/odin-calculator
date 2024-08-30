// Basic math functions
const add = (a, b) => roundResult(a + b);
const subtract = (a, b) => roundResult(a - b);
const divide = (a, b) => (b === 0 ? "Error: Division by zero" : roundResult(a / b));
const multiply = (a, b) => roundResult(a * b);

// Function to round results 
function roundResult(result) {
    const decimalPlaces = 2;
    return Math.round(result * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

// Function to perform calculation based on operator
let numberOne = null;
let numberTwo = null;
let operator = null;
let shouldResetDisplay = false;

function operate(numberOne, numberTwo, operator) {
    const operations = {
        '+': add,
        '-': subtract,
        'x': multiply,
        '/': divide,
    };
    return operations[operator](numberOne, numberTwo);
}

// Variables + function to update display
let displayValue = '0';
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

// Function to handle number input
function appendNumber(value) {
    if (value === '.' && displayValue.includes('.')) {
        return;
    }
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

// Function to change sign of most recent number
function changeSign() {
    displayValue = displayValue.charAt(0) === '-' ? displayValue.substring(1) : `-${displayValue}`;
    updateDisplay();
}

document.querySelector('button.change-sign').addEventListener('click', changeSign);

// Function to calculate percentages
function calculatePercentage() {
    if (numberOne !== null && operator !== null) {
        numberTwo = parseFloat(displayValue);

        switch (operator) {
            case 'x':
                numberOne = numberOne * (numberTwo / 100);
                break;
            case '/':
                if (numberTwo !== 0) {
                    numberOne = numberOne / (numberTwo / 100);
                } else {
                    displayValue = "Error: Division by zero";
                }
                break;
            case '+':
                numberOne = numberOne + (numberTwo * numberOne) / 100;
                break;
            case '-':
                numberOne = numberOne - (numberTwo * numberOne) / 100;
                break;
            case '%':
                numberOne = (numberOne / numberTwo) * 100;
                break;
        }

        displayValue = `${numberOne}`;
        updateDisplay();
        shouldResetDisplay = true;
    }
}

document.querySelector('button.percentage').addEventListener('click', calculatePercentage);
