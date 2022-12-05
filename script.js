const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  screen = document.getElementById("screen"), clearBtn = document.getElementById("clearBtn"),
  negativeBtn = document.getElementById("negative"), equalsBtn = document.getElementById("equals"), 
  addBtn = document.getElementById("add"), subtractBtn = document.getElementById("subtract"), 
  multiplyBtn = document.getElementById("multiply"), divideBtn = document.getElementById("divide");

let firstNum = 0; secondNum = 0, equalsPressed = false;

for (i = 0; i < buttonElements.length; i++) {
  buttonElements[i].onclick = function() {
    if (equalsPressed === true) {
      clear();
    }
    screen.innerText += document.getElementById(this.id).innerText;
    equalsPressed = false;
  }
}

function clear() {
  screen.innerText = null;
  firstNum = 0;
  secondNum = 0;
}

clearBtn.onclick = function() {
  clear()
}

negativeBtn.onclick = function() {
  if (screen.innerText != 0) {
    screen.innerText = (-1) * parseInt(screen.innerText);
  }
}

function getNum(button) {
  equalsPressed = false;
  firstNum = parseFloat(screen.innerText);
  screen.innerText += document.getElementById(button.id).innerText;
}

addBtn.onclick = function() {
  getNum(addBtn);
}

subtractBtn.onclick = function() {
  getNum(subtractBtn);
}

multiplyBtn.onclick = function() {
  getNum(multiplyBtn);
}

divideBtn.onclick = function() {
  getNum(divideBtn);
}

function scanExpression(position, expression) {
  let secondNumString = "";
  for (j = position + 1; j < expression.length; j++) {
    secondNumString += expression.charAt(j);
  }
  secondNum = parseFloat(secondNumString);
}

function add(position, expression) {
  scanExpression(position, expression);
  screen.innerText = secondNum + firstNum;
}

function subtract(position, expression) {
  scanExpression(position, expression)
  screen.innerText = firstNum - secondNum;
}

function multiply(position, expression) {
  scanExpression(position, expression)
  screen.innerText = firstNum * secondNum;
}

function divide(position, expression) {
  scanExpression(position, expression)
  screen.innerText = firstNum / secondNum;
}

equalsBtn.onclick = function() {
  let expression = screen.innerText;
  screen.innerText = recurseExpression(expression);
  /*for (i = expression.length - 1; i >= 0; i--) {
    if(isNaN(expression.charAt(expression.length-1))){
      screen.innerText = "Error!";
      break;
    }
    else if (expression.charAt(i) === "+") {
      add(i, expression);
      break;
    }
    else if (expression.charAt(i) === "-" && i != 0) {
      subtract(i, expression);
      break;
    }
    else if (expression.charAt(i) === "x" && i != 0) {
      multiply(i, expression);
      break;
    }
    else if (expression.charAt(i) === "÷" && i != 0) {
      divide(i, expression);
      break;
    }
  }
  equalsPressed = true;*/
}

function recurseExpression(expression){
  let secondNum = 0, firstNum = 0, hasOperator = true;
  for(i = expression.length - 1; i >= 0; i--){
    if(expression.charAt(i) === "+"){
      hasOperator = true;
      firstNum = parseFloat(expression.slice(i+1, expression.length));
      expression = expression.slice(0, i);
      secondNum = recurseExpression(expression);
      secondNum = secondNum + firstNum;
      break;
    }
    else if(expression.charAt(i) === "-"){
      hasOperator = true;
      firstNum = parseFloat(expression.slice(i+1, expression.length));
      expression = expression.slice(0, i);
      secondNum = recurseExpression(expression);
      secondNum = secondNum - firstNum;
      break;
    }
    else if(expression.charAt(i) === "x"){
      hasOperator = true;
      firstNum = parseFloat(expression.slice(i+1, expression.length));
      expression = expression.slice(0, i);
      secondNum = recurseExpression(expression);
      secondNum = secondNum * firstNum;
      break;
    }
    else if(expression.charAt(i) === "÷"){
      hasOperator = true;
      firstNum = parseFloat(expression.slice(i+1, expression.length));
      expression = expression.slice(0, i);
      secondNum = recurseExpression(expression);
      secondNum = secondNum / firstNum;
      break;
    }
    else {
      hasOperator = false;
    }
  }
  if(hasOperator === false){
    secondNum = expression;
  }
  return parseFloat(secondNum);
}







