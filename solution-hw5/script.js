
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

const glazeData = [
    {name: "Keep original", price: 0},
    {name: "Sugar milk", price: 0},
    {name: "Vanilla milk", price: .5},
    {name: "Double chocolate", price: 1.5}
]

//index.html ----------
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
    if(window.location.href.indexOf("product") > -1){
        document.querySelector('.page-head').innerHTML = rollType + " Cinnamon Roll";
        document.querySelector('.product-img').innerHTML = "<img src=products/" + rollType.toLowerCase() + "-cinnamon-roll.jpg>";
    }
}

//product.html ----------
function glazeDropDown(){

    if(window.location.href.indexOf("product") > -1){
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
    }
}

const packData = [
    {number: 1, price: 1},
    {number: 3, price: 3},
    {number: 6, price: 5},
    {number: 12, price: 10}
]

function packSizeDropDown(){
    if(window.location.href.indexOf("product") > -1){
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

    packPrice(){
        let packPrice = 0;
        let glazingPrice = 0;

        for (let i=0; i<packData.length; i++){
            let number = packData[i].number;
            let price = packData[i].price;
            if(this.size == number){
                packPrice = price;
            }
        }

        for (let i=0; i<glazeData.length; i++){
            let name = glazeData[i].name;
            let price = glazeData[i].price;
            if(this.rollGlazing == name){
                glazingPrice == price;
            }
        }
        return packPrice * (this.basePrice + glazingPrice);
    }  
}


function addCartClickToProductPg(){

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


// cart.html ----------
const cartPageBunsPrice = []; //THIS IS THE CART FOR HW5!!!! NOT cart[] WHICH IS FOR HW4!!!!

let originalBun = new Roll("Original", "Sugar milk", 1, 2.49);
let walnutBun = new Roll("Walnut", "Vanilla milk", 12, 3.49);
let raisinBun = new Roll("Raisin", "Sugar milk", 3, 2.99);
let appleBun = new Roll("Apple", "Keep original", 3, 3.49);
const cartPageBuns = [originalBun, walnutBun, raisinBun, appleBun];

function createNewCartItem(roll){
    const divNames = ['cart-column-left', 'cart-column-center', 'cart-column-right'];
    let rollType = roll.type;
    let rollGlazing = roll.glazing;
    let rollPackSize = roll.size;
    let rollPackPrice = roll.packPrice();

    let grid = document.querySelector(".cart-grid");
    let rowDiv = document.createElement("div");
    grid.appendChild(rowDiv);
    rowDiv.classList.add('cart-row');

    for(i in divNames){
        let table = rowDiv;
        let newDiv = document.createElement("div");
        table.appendChild(newDiv);
        newDiv.classList.add(divNames[i]);
        const br = document.createElement("br");

        if(i==0){
            let newImage = document.createElement("img");
            newImage.src="products/"+ rollType.toLowerCase() + "-cinnamon-roll.jpg";
            let newRemoveText = document.createElement("div");
            newDiv.appendChild(newImage);
            newDiv.appendChild(newRemoveText);
            newRemoveText.classList.add("cart-remove");
            newRemoveText.innerHTML = "Remove";
            let removeIndex = document.querySelectorAll('cart-remove').length
            newRemoveText.addEventListener("click", function(){
                document.querySelectorAll('.cart-row')[removeIndex].remove();
                cartPageBuns.pop(removeIndex);
                console.log(cartPageBuns);
            });
        }

        if(i==1){
            const newDescText = ["Roll Type: ", rollType, "Glazing: ", rollGlazing, "Pack Size: ", rollPackSize];
            for(i in newDescText){
                newDiv.innerHTML += newDescText[i];
                if(i%2==1){
                    newDiv.appendChild(br);}
            }
        }

        if(i==2){
            newDiv.innerHTML += "$" + rollPackPrice.toFixed(2);
            cartPageBunsPrice.push(parseFloat(rollPackPrice.toFixed(2)));
        }

    }
}

function fillCart(list){
    for(i in list){
        createNewCartItem(list[i]);
    }
}

function getCartTotal(){
    let total = 0;
    for(i in cartPageBunsPrice){
        total+= cartPageBunsPrice[i];
    }
    document.getElementById('cart-total').innerHTML = "$" + total;
}




console.log(cartPageBunsPrice);

fillTableWithBuns('.gallery-product-desc')
updateQuery('.column')
glazeDropDown()
packSizeDropDown()
updateProductImage()

fillCart(cartPageBuns);
getCartTotal();

