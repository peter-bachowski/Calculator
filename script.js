const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  screen = document.getElementById("screen"), clearBtn = document.getElementById("clearBtn"),
  negativeBtn = document.getElementById("negative"), equalsBtn = document.getElementById("equals"),
  addBtn = document.getElementById("add"), subtractBtn = document.getElementById("subtract"),
  multiplyBtn = document.getElementById("multiply"), divideBtn = document.getElementById("divide");

let firstNum = 0; secondNum = 0, equalsPressed = false;

for (i = 0; i < buttonElements.length; i++) {
  buttonElements[i].onclick = function() {
    if (equalsPressed === true && this.className != "operator") {
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

negativeBtn.onclick = function() {//fix this function
  if (screen.innerText != 0) {
    screen.innerText = (-1) * parseInt(screen.innerText);
  }
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
  let secondNum = 0, firstNum = 0, ans = 0, hasOperator = true;
  for (position = 0; position < expression.length; position++) {
    let char = expression.charAt(position);
    if (char === "x" || char === "÷") {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);
      secondNum = scanSecondNum(position, expression);
      if (char === "x") {
        ans = firstNum * secondNum;
      }
      else if (char === "÷") {
        if (secondNum === 0) {
          return "Can't divide by zero bruh";
        }
        ans = firstNum / secondNum;
      }
      expression = expression.substring(0, j + 1) + ans + expression.substring(k, expression.length);
      position = -1;
    }
    else {
      hasOperator = false;
    }
  }
  for (position = 0; position < expression.length; position++) {
    let char = expression.charAt(position);
    if (position != 0 && (char === "+" || char === "-")) {
      hasOperator = true;
      firstNum = scanFirstNum(position, expression);
      secondNum = scanSecondNum(position, expression);
      if (char === "+") {
        ans = firstNum + secondNum;
      }
      else if (char === "-") {
        ans = firstNum - secondNum;
      }
      expression = expression.substring(0, j + 1) + ans + expression.substring(k, expression.length);
      position = -1;
    }
    else {
      hasOperator = false;
    }
  }
  return ans;
}







