let products=[];
let filter="all";
let sort=null;
let editingId=null;

const createProduct=(data)=>({
id:crypto.randomUUID(),
...data,
price:Number(data.price),
created:Date.now(),
updated:Date.now()
});

const deleteProduct=(list,id)=>
list.filter(p=>p.id!==id);

const updateProduct=(list,id,newData)=>
list.map(p=>p.id===id?
{...p,...newData,updated:Date.now()} : p);

const getTotal=(list)=>
list.reduce((s,p)=>s+p.price,0);

const applyFilter=(list,f)=>
f==="all"?list:list.filter(p=>p.category===f);

const applySort=(list,s)=>{
if(!s) return list;
const copy=[...list];
if(s==="price") return copy.sort((a,b)=>a.price-b.price);
if(s==="created") return copy.sort((a,b)=>b.created-a.created);
if(s==="updated") return copy.sort((a,b)=>b.updated-a.updated);
};


const listEl=document.getElementById("productList");
const empty=document.getElementById("emptyMessage");
const total=document.getElementById("totalPrice");

const toast=(msg)=>{
const t=document.getElementById("toast");
t.textContent=msg;
t.classList.add("show");
setTimeout(()=>t.classList.remove("show"),2500);
};

const render=()=>{

listEl.innerHTML="";

let view=applySort(applyFilter(products,filter),sort);

empty.textContent=
view.length===0
?"Наразі список товарів пустий. Додайте новий товар."
:"";

view.forEach(p=>{
const li=document.createElement("li");
li.className="card";

li.innerHTML=`
<img src="${p.image}" alt="${p.name}">
<div class="card-content">
<p>ID: ${p.id}</p>
<h3>${p.name}</h3>
<p>${p.price} ₴</p>
<p>${p.category}</p>

<div class="actions">
<button data-del="${p.id}">Видалити</button>
<button data-edit="${p.id}">Редагувати</button>
</div>
</div>
`;

listEl.appendChild(li);
});

total.textContent=`Загальна вартість: ${getTotal(products)} ₴`;
};


const modal=document.getElementById("modal");
const form=document.getElementById("productForm");

document.getElementById("addBtn").onclick=()=>{
editingId=null;
form.reset();
modal.classList.remove("hidden");
};

document.getElementById("closeModal").onclick=
()=>modal.classList.add("hidden");

form.onsubmit=e=>{
e.preventDefault();

const data=Object.fromEntries(new FormData(form));

if(editingId){
products=updateProduct(products,editingId,data);
toast(`Оновлено товар: ${data.name}`);
}else{
products=[...products,createProduct(data)];
toast("Товар додано");
}

modal.classList.add("hidden");
render();
};


listEl.onclick=e=>{

if(e.target.dataset.del){
products=deleteProduct(products,e.target.dataset.del);
toast("Товар видалено");
render();
}

if(e.target.dataset.edit){
const p=products.find(x=>x.id===e.target.dataset.edit);
editingId=p.id;

form.name.value=p.name;
form.price.value=p.price;
form.category.value=p.category;
form.image.value=p.image;

modal.classList.remove("hidden");
}
};


document.querySelectorAll("[data-filter]")
.forEach(b=>b.onclick=()=>{
filter=b.dataset.filter;
render();
});


document.querySelectorAll("[data-sort]")
.forEach(b=>b.onclick=()=>{
sort=b.dataset.sort;
render();
});

document.getElementById("resetSort").onclick=()=>{
sort=null;
render();
};

render();