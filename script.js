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
let isResultDisplayed = false;

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        const value = digit.textContent;
        if (isResultDisplayed) {
            entry1 = "";
            entry2 = "";
            operator = "";
            isResultDisplayed = false;
        }
        if (operator === "") {
            if (value === "." && (entry1 === "" || entry1 === "0")) {
                entry1 = "0.";
                display.textContent = "0.";
            } else if (value === "." && entry1.includes(".")) {
                return;
            } else if (value === "0" && (entry1 === "0" || entry1.startsWith("0") && !entry1.includes("."))) {
                return;
            } else {
                entry1 += value;
                display.textContent = entry1.replace(/^0+(?=\d)/, "");
            }
            entry2 = "";
        } else {
            if (value === "." && (entry2 === "" || entry2 === "0")) {
                entry2 = "0.";
                display.textContent = "0.";
            } else if (value === "." && entry2.includes(".")) {
                return;
            } else if (value === "0" && (entry2 === "0" || entry2.startsWith("0") && !entry2.includes("."))) {
                return;
            } else {
                entry2 += value;
                display.textContent = entry2.replace(/^0+(?=\d)/, "");
            }
        }
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (entry1 === "" || entry1 === "Error") return;
        if (entry2 != "" && operator !== "") {
            display.textContent = operate(entry1, entry2, operator);
            entry1 = display.textContent;
            entry2 = "";
        }
        operator = btn.textContent;
        isResultDisplayed = false;
    });
});

equalsBtn.addEventListener('click', () => {
    if (entry2 !== "" && operator !== "") {
        display.textContent = operate(entry1, entry2, operator);
        entry1 = display.textContent;
        entry2 = "";
        operator = "";
        isResultDisplayed = true;
    }
});

clear.addEventListener('click', () => {
    display.textContent = 0;
    entry1 = "";
    entry2 = "";
    operator = "";
    isResultDisplayed = false;
});

del.addEventListener('click', () => {
    if (entry1 !== "" && entry2 == "") {
        entry1 = entry1.slice(0, entry1.length - 1)
        display.textContent = entry1 || "0";
    } else {
        entry2 = entry2.slice(0, entry2.length - 1)
        display.textContent = entry2 || "0";
    }
    isResultDisplayed = false;
});


function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (parseFloat(b) === 0) {
        return "Error";
    }
    return parseFloat(a) / parseFloat(b);
}

function operate(operand1, operand2, operator) {
    const result = (operator === ADD) ? add(operand1, operand2) :
        (operator === SUBTRACT) ? subtract(operand1, operand2) :
            (operator === MULTIPLY) ? multiply(operand1, operand2) :
                divide(operand1, operand2);
    if (typeof result === "string") return result;
    if (Number.isInteger(result)) return result;
    return parseFloat(result.toFixed(8)).toString();
}