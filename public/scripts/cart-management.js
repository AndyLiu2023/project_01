const addCartElement = document.getElementById('buyBtn');
const checkedSizeOptions = document.querySelectorAll('input[name^="size"]');
const checkedColorOptions = document.querySelectorAll('input[name^="color"]');
const selectelement = document.getElementById('select');
const badgeElements = document.querySelectorAll('.badge01');



function checkoptions(options){
    for (const option of options){
    if(option.checked){
        return option.value
    }
    
}
};

async function addToCart(){
    const productUid = addCartElement.dataset.productuid;
    const CSRFToken = addCartElement.previousElementSibling.value;
    const checkedSize = checkoptions(checkedSizeOptions);
    const checkedColor = checkoptions(checkedColorOptions);
    const selectedIndex = selectelement.selectedIndex;
    const selectvalue = selectelement.options[selectedIndex].value;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productUid: productUid,
                size: checkedSize,
                color: checkedColor,
                buyNumber: selectvalue,
                CSRFToken: CSRFToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
       


    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong!');
        return;
      }else{

        const successText = document.createElement('p');
        successText.textContent = '商品成功新增至購物車！';
        successText.style.fontSize = '1.2rem'
        
        addCartElement.parentElement.appendChild(successText);

        setTimeout(function(){ successText.remove();
        ;
       }, 2000);


      }

    const responseData = await response.json();

    
    const newTotalQuantity = responseData.newTotalItems;

    for(const badgeElement of badgeElements){
        badgeElement.textContent = newTotalQuantity;
    }


}



addCartElement.addEventListener('click', addToCart);