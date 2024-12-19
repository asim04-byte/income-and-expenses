const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.getElementById('amounts')
const trans = document.querySelector("#trans");
const localStoragTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !==null? localStoragTrans:[];

function loadTransactionDetails(transaction){
    const sign = transaction.amount < 0 ?"-":"+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp":"inc")
    //classlist vachi tha css la income 
    item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick = "removeTrans(${transaction.id})">x</button>
    `;
    //Math.abs ethuku use pandrom na simple double ah varama iruka 
    // ex:amount -100 kudutha atha - um sign - um serthu --100
    //ipudi varama iruka abs use pandrom abs full form absolute value
    trans.appendChild(item);
}
function removeTrans(id){
    if (confirm("are you sure you want to delete Transaction?"))
        {
            transactions = transactions.filter((transaction)=>transaction.id != id);
            confiq();
            updateLocalStorage();
    } else{
        return;
    }
}
function updateAmount(){
    const amounts = transactions.map((transaction)=>transaction.amount);
    const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    balance.innerHTML =`₹ ${ total }`;
    const income = amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    inc_amt.innerHTML =`₹ ${ income }`;
    const expense = amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    exp_amt.innerHTML =`₹ ${ Math.abs(expense) }`;
}
function confiq() {
    trans.innerHTML = "";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}
function addTransaction(e){
    e.preventDefault();
    if (description.value=="" || amount.value==""){
        console.log(1)
        alert("Please Enter Description and amount");
    } else {
        console.log('done')
        const transaction = {
            id: uniqueId(),
            description:description.value,
            amount: +amount.value,
            
        };
        console.log("description",description.value)
        console.log("amount",amount.value)
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value = "";
        amount.value = "";
        updateAmount();
        updateLocalStorage()
    }
}
function uniqueId(){
    return Math.floor(Math.random()*50)
    
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load",function() {
    confiq();
});
function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions))
}