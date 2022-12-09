const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  screen = document.getElementById("screen"), clearBtn = document.getElementById("clearBtn"),
  negativeBtn = document.getElementById("negative"), equalsBtn = document.getElementById("equals"), 
  dotBtn = document.getElementById("dot"), backBtn = document.getElementById("back");

let equalsPressed = false, dotPressed = false;

for (i = 0; i < buttonElements.length; i++) {
  buttonElements[i].onclick = function() {
    if (equalsPressed === true && this.className != "operator") {
      clear();
    }
    if (this.id === "dot") {
      if (dotPressed === true) {
        screen.innerText += "";
      }
      else {
        screen.innerText += document.getElementById(this.id).innerText;
        dotPressed = true;
      }
    }
    else {
      screen.innerText += document.getElementById(this.id).innerText;
      equalsPressed = false;
      if (this.className === "operator") {
        dotBtn.setAttribute("id", "dot");
        dotPressed = false;
      }
    }
  }
}

function clear() {
  screen.innerText = null;
}

clearBtn.onclick = function() {
  clear()
}

negativeBtn.onclick = function() {//fix this function
  if (screen.innerText != 0) {
    screen.innerText = (-1) * parseInt(screen.innerText);
  }
}

backBtn.onclick = function() {
  let expression = screen.innerText;
  expression = expression.slice(0, expression.length - 1);
  screen.innerText = expression;
}

equalsBtn.onclick = function() {
  let expression = screen.innerText;
  screen.innerText = operate(expression);
  equalsPressed = true;
}

function scanFirstNum(position, expression) {
  for (j = position - 1; j >= 0; j--) {
    let char = expression.charAt(j);
    if (j != 0 && (char === "+" || char === "-" || char === "x" || char === "÷")) {
      return parseFloat(expression.slice(j + 1, position));
    }
  }
  return parseFloat(expression.slice(j + 1, position));
}

function scanSecondNum(position, expression) {
  for (k = position + 1; k < expression.length; k++) {
    let char = expression.charAt(k);
    if (char === "+" || char === "-" || char === "x" || char === "÷") {
      return parseFloat(expression.slice(position + 1, k))
    }
  }
  return parseFloat(expression.slice(position + 1, expression.length));
}

function operate(expression) {
  let secondNum = 0, firstNum = 0, result = 0, hasOperator = true;
  expression = expression.trim();
  for (position = 0; position < expression.length; position++) { //first for loop searches the expression for multiplication or division
    let char = expression.charAt(position);
    if (char === "x" || char === "÷") {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);
      secondNum = scanSecondNum(position, expression);
      if (char === "x") {
        result = firstNum * secondNum;
      }
      else if (char === "÷") {
        if (secondNum === 0) {
          return "Can't divide by zero bruh";
        }
        result = firstNum / secondNum;
      }
      expression = expression.substring(0, j + 1) + result + expression.substring(k, expression.length);
      position = -1;
    }
    else {
      hasOperator = false;
    }
  }
  for (position = 0; position < expression.length; position++) {//second for loop searches the expression for addition or subtraction
    let char = expression.charAt(position);
    if (position != 0 && (char === "+" || char === "-")) {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);
      secondNum = scanSecondNum(position, expression);
      if (char === "+") {
        result = firstNum + secondNum;
      }
      else if (char === "-") {
        result = firstNum - secondNum;
      }
      expression = expression.substring(0, j + 1) + result + expression.substring(k, expression.length);
      position = -1;
    }
    else {
      hasOperator = false;
    }
  }
  return result;
}







