document.querySelector('.product-desc').textContent = "working";

function getGlaze(element){
    const glaze = element.value;
    return glaze;
}

function getPackSize(element){
    const packSize = element.value;
    return packSize;
}

function getTotalPrice(){
    glazePrice = getGlaze();
    packSize = getPackSize();
    let basePrice = 2.49;
    const totalPrice = (basePrice+glazePrice)* packSize;

    document.querySelector('.product-price').textContent = totalPrice;

}

//     let basePrice = 2.49;
//     for 
//     let glazingPrice = parseFloat(document.querySelector('#glazing').value);
//     let packPrice = parseInt(document.querySelector('#packsize').value);
//     finalPrice = ((glazingPrice + basePrice) * packPrice);
//     document.querySelector('.product-price').textContent = "$"+finalPrice.toFixed(2);
// }







