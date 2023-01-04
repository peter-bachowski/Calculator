const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  expressionDisplay = document.getElementById("expressionDisplay"), clearBtn = document.getElementById("clearBtn"), expressionMemory = document.getElementById("expressionMemory"), clearMemBtn = document.getElementById("clearMemBtn"),
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
        let expression = expressionDisplay.innerText;
        let lastChar = expression.charAt(expression.length - 1);
        if (isNaN(lastChar) || lastChar === "") {
          expressionDisplay.innerText += "0" + document.getElementById(this.id).innerText;
          dotPressed = true;
          equalsPressed = false;
        }
        else {
          expressionDisplay.innerText += document.getElementById(this.id).innerText;
          dotPressed = true;
          equalsPressed = false;
        }
      }
    }
    else {
      if (this.id != "back" && this.id != "equals") {
        expressionDisplay.innerText += document.getElementById(this.id).innerText;
      }
      equalsPressed = false;
      if (this.className === "operator") {
        dotBtn.setAttribute("id", "dot");
        dotPressed = false;
      }
    }
  }
}


//listeners
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (isNaN(key) === false || key === "." || key === "+" || key === "-") {
    expressionDisplay.innerText += key;
  }
  else if (key === "*") {
    expressionDisplay.innerText += "×";
  }
  else if (key === "/") {
    expressionDisplay.innerText += "÷";
  }
  else if (key === "Backspace") {
    backSpace();
  }
  else if (key === "Enter") {
    equals();
  }
});

backBtn.addEventListener("click", backSpace);

equalsBtn.addEventListener("click", equalsFcn);


clearBtn.onclick = function() {
  clear()
}

clearMemBtn.onclick = function() {
  clearMemory()
}

negativeBtn.onclick = function() {
  let expression = expressionDisplay.innerText;
  if (isNaN(expression.charAt(expression.length - 1)) === false) {
    for (i = expression.length - 1; i >= 0; i--) {
      let char = expression.charAt(i);
      if ((char === "+" || char === "-" || char === "×" || char === "÷") && expression.charAt(i - 1) != null) {
        let lastNum = scanSecondNum(i, expression);
        expressionDisplay.innerText = expression.slice(0, i + 1) + "(" + -lastNum + ")";
        return;
      }
    }
    expressionDisplay.innerText = -parseFloat(expression);
  }
}

equalsBtn.onclick = function() {

}

//functions
function clear() {
  expressionDisplay.innerText = null;
  dotPressed = false;
}

function clearMemory() {
  while (expressionMemory.firstChild) {
    expressionMemory.removeChild(expressionMemory.firstChild)
  }
}

function backSpace() {
  let expression = expressionDisplay.innerText;
  let char = expression.slice(expression.length - 1, expression.length);
  expression = expression.slice(0, expression.length - 1);
  expressionDisplay.innerText = expression;
  if (char === ".") {
    dotPressed = false;
  }
  equalsPressed = false;
}

function equalsFcn() {
  let expression = expressionDisplay.innerText;
  const expressionUsed = document.createElement("div");
  expressionUsed.innerText = "= " + expression;
  expressionUsed.id = "expressionUsed";
  expressionUsed.style.paddingLeft = "5px";
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
    if (char === "(") {
      k += 1;
    }
    if (char === "+" || char === "-" || char === "×" || char === "÷") {
      if (expression.charAt(position + 1) === "(") {
        return parseFloat(expression.slice(position + 2, k - 1));
      }
      else {
        return parseFloat(expression.slice(position + 1, k));
      }
    }
  }
  if (expression.charAt(position + 1) === "(") {
    if (expression.charAt(k - 1) === ")") {
      return parseFloat(expression.slice(position + 2, expression.length - 1));
    }
    else {
      return parseFloat(expression.slice(position + 2, expression.length));
    }
  }
  else {
    return parseFloat(expression.slice(position + 1, expression.length));
  }
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
      if (expression.charAt(position + 1) === "(") {
        expression = expression.substring(0, j + 1) + result + expression.substring(k, expression.length);
      }
      else {
        expression = expression.substring(0, j + 1) + result + expression.substring(k, expression.length);
      }
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







