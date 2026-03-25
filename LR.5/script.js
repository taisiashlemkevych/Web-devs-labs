const bulb = document.getElementById("bulb");
let autoOff;

document.getElementById("toggleBtn").onclick = () => {
  bulb.classList.toggle("on");

  clearTimeout(autoOff);
  autoOff = setTimeout(() => {
    bulb.classList.remove("on");
    alert("Автовимкнення");
  }, 300000);
};

document.getElementById("typeBtn").onclick = () => {

  const type = prompt("normal / eco / led");

  bulb.classList.remove("normal","eco","led");

  bulb.classList.add(type);
};

document.getElementById("brightBtn").onclick = () => {
  const value = prompt("0-100");
  bulb.style.opacity = value / 100;
};


//traffic

let states = ["red","yellow","green","blink"];
let index = 0;

function showState(name){
  document.querySelectorAll(".light")
    .forEach(l=>l.classList.remove("active"));

  if(name!=="blink")
    document.getElementById(name).classList.add("active");

  document.getElementById("trafficText").textContent = name;
}

function cycle(){

  let state = states[index];

  if(state==="red"){
    showState("red");
    setTimeout(next,5000);
  }

  else if(state==="yellow"){
    showState("yellow");
    setTimeout(next,3000);
  }

  else if(state==="green"){
    showState("green");
    setTimeout(next,7000);
  }

  else{
    let c=0;
    let blink=setInterval(()=>{
      document.getElementById("yellow")
        .classList.toggle("active");

      c++;
      if(c===6){
        clearInterval(blink);
        next();
      }
    },500);
  }
}

function next(){
  index=(index+1)%states.length;
  cycle();
}

document.getElementById("manualBtn").onclick = next;

cycle();

//clocks

function startClock() {

  const clock = document.getElementById("clock");
  let blink = true;

  setInterval(() => {

    const now = new Date();

    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");

    const separator = blink ? ":" : " ";

    clock.textContent = `${h}${separator}${m}${separator}${s}`;

    blink = !blink;

  },1000);
}

startClock();

//timer

let timerInterval;

function startTimer(){

  clearInterval(timerInterval);

  const value = document.getElementById("timerInput").value;

  if(!value){
    alert("Оберіть дату!");
    return;
  }

  const end = new Date(value);

  if(isNaN(end)){
    alert("Неправильна дата");
    return;
  }

  timerInterval = setInterval(updateTimer,1000,end);
}

function updateTimer(end){

  const diff = end - new Date();
  const output = document.getElementById("countdown");

  if(diff <= 0){
    clearInterval(timerInterval);
    output.textContent = "Таймер завершено";
    return;
  }

  const s = Math.floor(diff/1000)%60;
  const m = Math.floor(diff/60000)%60;
  const h = Math.floor(diff/3600000)%24;
  const d = Math.floor(diff/86400000);

  output.textContent =
    `${d}д ${h}г ${m}хв ${s}с`;
}

document.getElementById("startTimer").onclick = startTimer;

//calendar

document.getElementById("monthPicker")
.addEventListener("change",e=>{
  const [y,m]=e.target.value.split("-");
  generateCalendar(y,m-1);
});

function generateCalendar(year,month){

  const table=document.getElementById("calendar");
  table.innerHTML="";

  const days=new Date(year,month+1,0).getDate();

  let row=document.createElement("tr");

  for(let i=1;i<=days;i++){
    let td=document.createElement("td");
    td.textContent=i;
    row.appendChild(td);

    if(i%7===0){
      table.appendChild(row);
      row=document.createElement("tr");
    }
  }
  table.appendChild(row);
}


//shop

const products = new Map();
const orders = new Set();
const history = new WeakMap();

let id=1;

document.getElementById("addProduct").onclick=()=>{
  const name=prompt("Назва");
  const price=+prompt("Ціна");
  const qty=+prompt("Кількість");

  const product={name,price,qty};

  products.set(id++,product);
  history.set(product,"created");

  render();
};

document.getElementById("orderProduct").onclick=()=>{
  const pid=+prompt("ID");

  const product=products.get(pid);

  if(product && product.qty>0){
    product.qty--;
    orders.add(product.name);
    history.set(product,"ordered");
  }

  render();
};

function render(){
  let text="Products:\n";

  products.forEach((p,id)=>{
    text+=`${id}: ${p.name} ${p.price}$ qty:${p.qty}\n`;
  });

  text+="\nOrders:\n";
  orders.forEach(o=>text+=o+"\n");

  document.getElementById("shopOutput").textContent=text;
}