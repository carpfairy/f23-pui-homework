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

glazeDropDown()

function packSizeDropDown(){
    const packData = [
        {number:1, price:1},
        {number:3, price:3},
        {number:6, price:5},
        {number:12, price:10}
    ]

    let packLength = packData.length;
    const packDropDown = document.querySelector('#packsize');
    for (let i=0; i <packLength; i++){
        let number = packData[i].number;
        let price = packData[i].price;
        let option = document.createElement("option");
        option.textContent = number;
        option.value = price;
        packDropDown.appendChild(option);
    }
    
    //Alternative Method
    // let packLength = pack.length;
    // let options = "<option value='0'>select</option>";
    // for (let i=0; i < packLength; i++) {
    //     options += "<option value='"+pack[i].price+"'>"+pack[i].number+"</option>";
    // }
    // document.querySelector('#packsize').innerHTML = options;

}
packSizeDropDown()

function getTotalPrice(){
    let basePrice = 2.49;
    let glazingPrice = parseFloat(document.querySelector('#glazing').value);
    let packPrice = parseFloat(document.querySelector('#packsize').value);
    finalPrice = ((glazingPrice + basePrice) * packPrice);
    document.querySelector('.product-price').textContent = "$"+finalPrice.toFixed(2);
}







