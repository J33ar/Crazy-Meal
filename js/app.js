//Menu Part
fetch('meals.json')
    .then(response => response.json())
    .then(data => {
        const container =document.getElementById("menu");
        data.forEach(meal => {
            const card = document.createElement("div");
            card.className = "card-content";
            card.innerHTML = `
            <img src ="${meal.image}">
            <h3>${meal.name}</h3>
            <p>${meal.price}</p>
            `;
            container.appendChild(card);
        });
});

//Home Part
const OrdForm = document.getElementById("Ord-form");
const TableContent = document.getElementById("Table-body");
const clearbtn = document.getElementById("clear-btn");
let orders = [];

function Order(name,price,image){
this.Name = name;
this.Price = price;
this.Image = image;
}

OrdForm.addEventListener("submit",() => {
    const mealName = document.getElementById("meal-name").value;
    const mealPrice = document.getElementById("meal-price").value;
    const mealImage = document.getElementById("meal-image").value;
    let order = new Order(mealName, mealPrice ,mealImage);
    CreateOrd(order.Name, order.Price ,order.Image);
    orders.push(order);
    setLocalStorage()
})

function CreateOrd(name,price,image){
    const tr = document.createElement("tr");
    tr.className="Ord-item";
    tr.innerHTML = `
    <td>${name}</td>
    <td>${price}$</td>
    <td><img src="${image}"></td>
    `;
    TableContent.appendChild(tr);
}

function setLocalStorage(){
    localStorage.setItem("Ord", JSON.stringify(orders));
}

function getLocalStorage(){
    const Ord_list = localStorage.getItem("Ord");

    if(Ord_list){
        orders = JSON.parse(Ord_list);
        orders.forEach(order => {
            CreateOrd(order.Name,order.Price,order.Image)
        });
    }
}

function clearLocalStorage(){
    localStorage.clear();
    orders=[];
    TableContent.innerHTML=``;
}

clearbtn.addEventListener("click",clearLocalStorage)

getLocalStorage();