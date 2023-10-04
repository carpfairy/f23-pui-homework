const bun = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
const cart = [];

function fillTableWithBuns(div){
    let thisDiv=document.querySelectorAll(div);
    let i=0;
    if (thisDiv.length<=0){return;}

    for(const [key, {basePrice}] of Object.entries(bun)){
        let iChange = 0;
        if (iChange<1){
            if(iChange%2 == 0){
                thisDiv[i].innerHTML = key + " Cinnamon Roll";
                thisDiv[i].style.textDecoration="underline";
                iChange+=1;
                i+=1;
            }
        }

        if(iChange%2 != 0){
            thisDiv[i].innerHTML = "$" + basePrice;
            thisDiv[i].style.textDecoration="none";
            iChange+=1;
            i+=1; 
        }
                
    }
}

function updateQuery(div){
    let thisDiv = document.querySelectorAll(div);
    const bunKeys = Object.keys(bun);

    for(let i=0; i<thisDiv.length; i++){
        let link = 'product.html?roll=' + bunKeys[i];
        thisDiv[i].addEventListener("click", function(){window.location.href=link});
    }

}

function updateProductImage(){
    document.querySelector('.page-head').innerHTML = rollType + " Cinnamon Roll";
    document.querySelector('.product-img').innerHTML = "<img src=products/" + rollType.toLowerCase() + "-cinnamon-roll.jpg>";
}

function glazeDropDown(){

    const glazeData = [
        {name:"Keep original", price: 0},
        {name: "Sugar milk", price:0},
        {name: "Vanilla milk", price:.5},
        {name: "Double chocolate", price: 1.5}
    ]
    
    let glazeLength = glazeData.length;
    const glazeDropDown = document.querySelector('#glazing');
    
    
    for (let i=0; i <glazeLength; i++){
        let name = glazeData[i].name;
        let price = glazeData[i].price;
        let option = document.createElement("option");
        option.textContent = name;
        option.value = price;
        glazeDropDown.appendChild(option);
    }
    
    //Alernative Method
    // let glazeLength = glazeData.length;
    // let options = "<option value='0'>select</option>";
    // for (let i=0; i < glazeLength; i++) {
    //     options += "<option value='"+glaze[i].price+"'>"+glaze[i].name+"</option>";
    // }
    // document.querySelector('#glazing').innerHTML = options;
}

function packSizeDropDown(){
    const packData = [
        {number:1, price:1},
        {number:3, price:3},
        {number:6, price:5},
        {number:12, price:10}
    ]

    let packLength = packData.length;
    const packDropDown = document.querySelector('#packSize');

    for (let i=0; i <packLength; i++){
        let number = packData[i].number;
        let price = packData[i].price;
        let option = document.createElement("option");
        option.textContent = number;
        option.value = price;
        packDropDown.add(option);
    }
}

function getTotalPrice(){
    let glazingPrice = parseFloat(document.querySelector('#glazing').value);
    let packPrice = parseFloat(document.querySelector('#packSize').value);
    let rollBasePrice = 2.49;

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get('roll');

    for(const [key, {basePrice}] of Object.entries(bun)){
        let stringKey = String(key);
        if(stringKey == rollType){
            rollBasePrice = basePrice;
            break;
        }
    }
    
    finalPrice = ((glazingPrice + rollBasePrice) * packPrice);
    document.querySelector('.product-price').textContent = "$"+finalPrice.toFixed(2);
}

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

function addCartClick(){

    let rollType = params.get('roll');
    let glazeSel= document.querySelector('#glazing');
    let rollGlazing = glazeSel.options[glazeSel.selectedIndex].innerHTML;

    let packSel = document.querySelector('#packSize');
    let packSize = packSel.options[packSel.selectedIndex].innerHTML;

    let bP = 2.49;

    for(const [key, {basePrice}] of Object.entries(bun)){
        let stringKey = String(key);
        if(stringKey == rollType){
            bP = basePrice;
            break;
        }
    }

    const roll = new Roll(rollType, rollGlazing, packSize, bP);
    cart.push(roll);
    console.log(cart);
}



fillTableWithBuns('.gallery-product-desc')
updateQuery('.column')
glazeDropDown()
packSizeDropDown()
updateProductImage()
