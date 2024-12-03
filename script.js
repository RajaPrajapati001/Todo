var mydiv = document.getElementById("tbody");
var isEdit = false;
var edi = null;
let updateText = "";

window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    createrow(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
  }
};
var enterKey = document.getElementById("enter");
enterKey.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && enterKey.value != "") {
    if (isEdit == true) {
      update();
    } else {
      e.preventDefault();
      add();
    }
  }
});

function save(rndm, text) {
  localStorage.setItem(rndm, text);
}

function add() {
  if (enterKey.value == "") {
    alert("please enter value");
  } else {
    let min = 10000;
    let max = 50000;
    var rndm = Math.floor(Math.random() * (max - min) + min);
    var text = document.getElementById("enter").value;
    createrow(rndm, text);
    enterKey.value = "";
  }
}
function createrow(rndm, text) {
  const row = document.createElement("tr");
  row.id = rndm;
  const col1 = document.createElement("td");
  const col2 = document.createElement("td");
  col2.id = `${rndm}uq`;
  const col3 = document.createElement("td");
  const btn = document.createElement("button");
  btn.setAttribute("style", "border-radius:7px");
  btn.innerHTML = "edit";
  btn.addEventListener("click", function () {
    edit(rndm, updateText);
  });
  btn.classList.add("greenbtn");
  btn.style.width = "43%";
  btn.style.height = "100%";
  const btn1 = document.createElement("button");
  btn1.setAttribute("style", "border-radius:7px");
  btn1.innerHTML = "Delete";
  btn1.addEventListener("click", function () {
    del(rndm);
  });
  btn1.style.width = "55%";
  btn1.style.height = "100%";
  col3.style.display = "flex";
  col3.style.justifyContent = "space-between";
  col1.innerText = `${rndm}`;
  col2.innerText = `${text}`;
  col3.appendChild(btn);
  col3.appendChild(btn1);
  mydiv.appendChild(row);
  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  updateText = col2.innerText;
  save(rndm, text);
}
function del(rndm) {
  var ran = rndm.toString();
  const id = document.getElementById(ran);
  id.remove();
  for (let j = 0; j < localStorage.length; j++) {
    if (localStorage.key(j) == ran) {
      let mykey = localStorage.key(j);
      localStorage.removeItem(mykey);
    }
  }
}
function edit(number) {
  firstsub.style.display = "none";
  secondsub.style.display = "inline-block";
  isEdit = true;
  const input = document.getElementById("enter");
  edi = `${number}uq`;
  const newtxt = document.getElementById(edi);
  let tex = newtxt.innerText;
  input.value = tex;
  input.focus();
}
function update() {
  if (enterKey.value == "") {
    alert("please enter value");
  } else {
    firstsub.style.display = "inline-block";
    secondsub.style.display = "none";
    const element = document.getElementById(edi);
    const input = document.getElementById("enter");
    element.innerHTML = input.value;
    const id = edi.replace("uq", "");
    for (let k = 0; k < localStorage.length; k++) {
      if (localStorage.key(k) == id) {
        localStorage.setItem(localStorage.key(k), input.value);
      }
    }
    enterKey.value = "";
  }
  isEdit = false;
}
