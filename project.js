const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");

const dummyData = [
    {id:1,description:"flower",amount:-20},
    {id:2,description:"salary",amount:35000},
    {id:3,description:"book",amount:-10},
    {id:4,description:"camera",amount:-150},
    {id:5,description:"petrol",amount:-120},
];

let transactions = dummyData;

function loadTransactionDetails(transaction){
    const sign = transaction.amount < 0 ?"-":"+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp":"inc")
    item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick = "removeTrans(${transaction.id})">x</button>
    `;
    trans.appendChild(item);
}
function removeTrans(id){
    if (confirm("are you sure you want to delete Transaction?"))
        {
            transactions = transactions.filter((transaction)=>transaction.id != id);
            confiq();
    } else{
        return;
    }
}
function updateAmount(){
    const amounts = transactions.map((transaction)=>transaction.amount);
    // console.log(amounts)
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
    if (description.value.trim()=="" || amount.value.trim()==""){
        alert("Please Enter Description and amount");
    } else {
        const transaction = {
            id:25121,
            description:description.value,
            amount: +amount.value,
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value = "";
        amount.value = "";
        updateAmount();
        

    }
}


form.addEventListener("submit", addTransaction);

window.addEventListener("load",function() {
    confiq();
});
