const buttonElements = document.querySelectorAll("button"), zeroBtn = document.getElementById("zero"),
  screen = document.getElementById("screen"), clearBtn = document.getElementById("clearBtn"),
  negativeBtn = document.getElementById("negative");



for (i = 0; i < buttonElements.length; i++) {
  buttonElements[i].onclick = function() {
    screen.innerText += document.getElementById(this.id).innerText;
  }
}


clearBtn.onclick = function() {
  screen.innerText = null;
}

negativeBtn.onclick = function() {
  if (screen.innerText != 0) {
    screen.innerText = (-1) * parseInt(screen.innerText);
  }
}




