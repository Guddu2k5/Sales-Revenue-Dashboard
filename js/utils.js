function formatCurrency(value){

return "₹"+Number(value).toLocaleString("en-IN");

}

function animateCounter(id,target){

let current=0;

const increment=Math.ceil(target/100);

const element=document.getElementById(id);

const timer=setInterval(()=>{

current+=increment;

if(current>=target){

current=target;

clearInterval(timer);

}

if(id==="revenue"||id==="avgOrder"){

element.innerText=formatCurrency(current);

}else{

element.innerText=current;

}

},20);

}