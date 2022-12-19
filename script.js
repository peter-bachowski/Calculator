const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  expressionDisplay = document.getElementById("expressionDisplay"), clearBtn = document.getElementById("clearBtn"), expressionMemory = document.getElementById("expressionMemory"),
  negativeBtn = document.getElementById("negative"), equalsBtn = document.getElementById("equals"),
  dotBtn = document.getElementById("dot"), backBtn = document.getElementById("back");

let equalsPressed = false, dotPressed = false;

for (i = 0; i < buttonElements.length; i++) {
  buttonElements[i].onclick = function() {
    if (equalsPressed === true && this.className === "num" && this.id != "negative") {
      clear();
    }
    if (this.id === "dot") {
      if (dotPressed === true) {
        expressionDisplay.innerText += "";
      }
      else {
        expressionDisplay.innerText += document.getElementById(this.id).innerText + " ";
        dotPressed = true;
        equalsPressed = false;
      }
    }
    else {
      expressionDisplay.innerText += document.getElementById(this.id).innerText;
      equalsPressed = false;
      if (this.className === "operator") {
        dotBtn.setAttribute("id", "dot");
        dotPressed = false;
      }
    }
  }
}

function clear() {
  expressionDisplay.innerText = null;
  dotPressed = false;
}

clearBtn.onclick = function() {
  clear()
}

negativeBtn.onclick = function() {
  let expression = expressionDisplay.innerText;
  for (i = 0; i <= expression.length - 1; i++) {
    let char = expression.charAt(i);
    if (char === "+" || char === "-" || char === "×" || char === "÷") {
      if (i === 0) {
        continue;
      }
      expressionDisplay.innerText += "-";
      return;
    }
  }
  expressionDisplay.innerText = -parseFloat(expressionDisplay.innerText);
}

backBtn.onclick = function() {
  let expression = expressionDisplay.innerText;
  let char = expression.slice(expression.length - 1, expression.length);
  expression = expression.slice(0, expression.length - 1);
  expressionDisplay.innerText = expression;
  if (char === ".") {
    dotPressed = false;
  }
  equalsPressed = false;
}

equalsBtn.onclick = function() {
  let expression = expressionDisplay.innerText;
  const expressionUsed = document.createElement("div");
  expressionUsed.innerText = "= " + expression;
  expressionUsed.id = "expressionUsed";
  expressionMemory.appendChild(expressionUsed);
  expressionMemory.lastChild.scrollIntoView();
  expressionUsed.onclick = function() {
    for (i = expressionUsed.innerText.length - 1; i >= 0; i--) {
      let char = expressionUsed.innerText.charAt(i);
      if (char === "=") {
        expressionDisplay.innerText = expressionUsed.innerText.slice(0, i - 1);
      }
    }
  }

  let result = operate(expression);
  expressionUsed.innerText = expression + " = " + result;
  expressionMemory.style.overflowY = "scroll";

  expressionDisplay.innerText = result
  expression = expressionDisplay.innerText;
  for (i = 0; i <= expression.length; i++) {
    if (expression.charAt(i) === ".") {
      dotPressed = true;
    }
  }
  equalsPressed = true;
}

function scanFirstNum(position, expression) {
  for (j = position - 1; j >= 0; j--) {
    let char = expression.charAt(j);
    if (j != 0 && (char === "+" || char === "-" || char === "×" || char === "÷")) {
      if (expression.charAt(j - 1) === "e") {
        continue;
      }
      return parseFloat(expression.slice(j + 1, position));
    }
  }
  return parseFloat(expression.slice(j + 1, position));
}

function scanSecondNum(position, expression) {
  for (k = position + 1; k < expression.length; k++) {
    let char = expression.charAt(k);
    if (char === "+" || char === "-" || char === "×" || char === "÷") {
      return parseFloat(expression.slice(position + 1, k))
    }
  }
  return parseFloat(expression.slice(position + 1, expression.length));
}

function operate(expression) {
  let secondNum = 0, firstNum = 0, result = 0, hasOperator = true;
  for (position = 0; position < expression.length; position++) { //first for loop searches the expression for multiplication or division
    let char = expression.charAt(position);
    if (char === "×" || char === "÷") {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);

      if (expression.charAt(position + 1) === "-") {
        secondNum = -scanSecondNum(position + 1, expression)
      }
      else {
        secondNum = scanSecondNum(position, expression);
      }
      if (char === "×") {
        result = firstNum * secondNum;
      }
      else if (char === "÷") {
        if (secondNum === 0) {
          return "Undefined";
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
    if (char === "e") {
      return result;
    }
    if (position != 0 && (char === "+" || char === "-")) {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);
      if (expression.charAt(position + 1) === "-") {
        secondNum = -scanSecondNum(position + 1, expression)
      }
      else {
        secondNum = scanSecondNum(position, expression);
      }
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
  if (hasOperator === false) {
    return Math.round(parseFloat(expression) * 100000000) / 100000000;
  }
  else {
    return Math.round(result * 100000000) / 100000000;
  }
}







