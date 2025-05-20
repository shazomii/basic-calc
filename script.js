const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const EQUALS = "=";

const digits = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const display = document.querySelector('.calc-display');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

let entry1 = "";
let entry2 = "";
let operator = "";

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (operator == "") {
            entry1 += digit.textContent;
            display.textContent = entry1;
            entry2 = "";
        } else if (operator !== "") {
            entry2 += digit.textContent;
            display.textContent = entry2;
        }
    })
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (entry2 != "") {
            display.textContent = operate(entry1, entry2, operator);
            entry1 = display.textContent;
            entry2 = "";
            operator = btn.textContent;
        } else {
            operator = btn.textContent;
        }
    });
});

equalsBtn.addEventListener('click', () => {
    if (entry2 !== "") {
        display.textContent = operate(entry1, entry2, operator);
        entry1 = display.textContent;
        entry2 = "";
        operator = "";
    }
});

clear.addEventListener('click', () => {
    display.textContent = 0;
    entry1 = "";
    entry2 = "";
    operator = "";
});

del.addEventListener('click', () => {
    if (entry1 !== "" && entry2 == "") {
        entry1 = entry1.slice(0, entry1.length - 1)
        display.textContent = entry1;
    } else {
        entry2 = entry2.slice(0, entry2.length - 1)
        display.textContent = entry2;
    }

});


function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operand1, operand2, operator) {
    switch (operator) {
        case ADD:
            return add(operand1, operand2);
        case SUBTRACT:
            return subtract(operand1, operand2);
        case MULTIPLY:
            return multiply(operand1, operand2);
        case DIVIDE:
            if (operand2 == 0) {
                return 0;
            } else {
                return divide(operand1, operand2);
            }
    }
}