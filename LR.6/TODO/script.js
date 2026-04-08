let tasks=[];
let sortType=null;

const createTask=text=>({
id:crypto.randomUUID(),
text,
completed:false,
created:Date.now(),
updated:Date.now()
});

const deleteTask=(list,id)=>
list.filter(t=>t.id!==id);

const toggleTask=(list,id)=>
list.map(t=>t.id===id
?{...t,completed:!t.completed,updated:Date.now()}
:t);

const updateTask=(list,id,newText)=>
list.map(t=>t.id===id
?{...t,text:newText,updated:Date.now()}
:t);

const sortTasks=(list,type)=>{
if(!type) return list;

const copy=[...list];

if(type==="created")
return copy.sort((a,b)=>b.created-a.created);

if(type==="updated")
return copy.sort((a,b)=>b.updated-a.updated);

if(type==="status")
return copy.sort((a,b)=>a.completed-b.completed);

};


const list=document.getElementById("taskList");
const empty=document.getElementById("emptyMessage");

const toast=msg=>{
const t=document.getElementById("toast");
t.textContent=msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2200);
};

const render=()=>{

list.innerHTML="";

const view=sortTasks(tasks,sortType);

empty.textContent=
view.length===0
?"Список завдань пустий."
:"";

view.forEach(task=>{

const li=document.createElement("li");
li.className=`task ${task.completed?"completed":""}`;

li.innerHTML=`
<span data-toggle="${task.id}">
${task.text}
</span>

<div class="actions">
<button class="edit" data-edit="${task.id}">Редагувати</button>
<button class="delete" data-del="${task.id}">Видалити</button>
</div>
`;

list.appendChild(li);
});
};

document.getElementById("taskForm").onsubmit=e=>{
e.preventDefault();

const input=document.getElementById("taskInput");

tasks=[...tasks,createTask(input.value.trim())];

input.value="";
toast("Завдання додано");

render();
};


list.onclick=e=>{

if(e.target.dataset.del){
tasks=deleteTask(tasks,e.target.dataset.del);
toast("Завдання видалено");
render();
}

if(e.target.dataset.toggle){
tasks=toggleTask(tasks,e.target.dataset.toggle);
render();
}

if(e.target.dataset.edit){

const id=e.target.dataset.edit;
const span=e.target.closest(".task").querySelector("span");

const input=document.createElement("input");
input.value=span.textContent;

span.replaceWith(input);
input.focus();

input.onblur=()=>{
tasks=updateTask(tasks,id,input.value);
toast("Завдання оновлено");
render();
};

input.onkeydown=e=>{
if(e.key==="Enter") input.blur();
};
}
};

document.querySelectorAll("[data-sort]")
.forEach(btn=>{
btn.onclick=()=>{
sortType=btn.dataset.sort;
render();
};
});

document.getElementById("resetSort").onclick=()=>{
sortType=null;
render();
};

render();