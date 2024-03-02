const quantityForms = document.querySelectorAll('.quantity-adjust-form');
const totalPrice = document.getElementById('total-price');
const totalQuantity = document.getElementById('total-quantity');
const changeBtn = document.querySelectorAll('.change-quantity-btn');
const cartItemUl = document.querySelector('.cart-item-ul');
const deleteForms = document.querySelectorAll('.product-delete-form');

const badgeElements = document.querySelectorAll('.badge01');


async function updateCartItem(event){
  event.preventDefault();
  console.log('clicked');
  const form = event.target;
  const productUid = form.dataset.productuid;
  const CSRFToken = form[0].value;
  const quantity = form.parentElement.children[2].children[1].value;
  const size = form.parentElement.previousElementSibling.children[1].children[0].textContent;
  const color = form.parentElement.previousElementSibling.children[2].children[0].textContent;
  
let response;

try {
  response = await fetch('/cart/items', {
    method: 'PATCH',
    body: JSON.stringify({
      CSRFToken: CSRFToken,
      productUid: productUid,
      quantity: quantity,
      size: size,
      color: color 

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  
} catch (error) {
  alert('Something went wrong!');
  return;
}

if (!response.ok) {
  alert('Something went wrong!');
  return;
}else{
  const updateText = document.createElement('span');
  updateText.textContent = '成功更新商品數量！';
  updateText.style.fontSize = '1rem';


  form.appendChild(updateText);
  setTimeout(function(){ updateText.remove();
    ;
   }, 1500);

}

const responseData = await response.json();

totalPrice.textContent =
responseData.updatedCartData.newTotalPrice;

totalQuantity.textContent = 
responseData.updatedCartData.newTotalQuantity;

for(const badgeElement of badgeElements){
  badgeElement.textContent =
  responseData.updatedCartData.newTotalQuantity;

}

}



async function deleteCartItem(event){
  event.preventDefault();
  console.log('deleted');
  const form = event.target;
  const CSRFToken = form[0].value;
  const productUid = form.dataset.productuid;
  const quantity = 0;

  const size = form.parentElement.previousElementSibling.previousElementSibling.children[1].children[0].textContent;
  const color = form.parentElement.previousElementSibling.previousElementSibling.children[2].children[0].textContent;
 
let response;

try {
  response = await fetch('/cart/items/delete', {
    method: 'PATCH',
    body: JSON.stringify({
      CSRFToken: CSRFToken,
      productUid: productUid,
      quantity: quantity,
      size: size,
      color: color 

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
} catch (error) {
  alert('Something went wrong!');
  return;
}

if (!response.ok) {
  alert('Something went wrong!');
  return;
}else{
  const removeText = document.createElement('p');
  removeText.textContent = '成功移除商品！'

  form.parentElement.appendChild(removeText);

}

const responseData = await response.json();

if (responseData.updatedCartData.updatedItemPrice === 0){


  setTimeout(function(){ form.parentElement.parentElement.parentElement.parentElement.remove();
    ;
   }, 1000);

   
 
  
  
}
totalPrice.textContent =
responseData.updatedCartData.newTotalPrice;

totalQuantity.textContent = 
responseData.updatedCartData.newTotalQuantity;

for(const badgeElement of badgeElements){
  badgeElement.textContent =
  responseData.updatedCartData.newTotalQuantity;

}

}




// function changeQuantity(){

//     for( let i = 0; changeBtn.length < i ; i++ ){
//         changeBtn[i].remove();
//     }



// }

// changeBtn.addEventListener('click', changeQuantity);

for (const quantityForm of quantityForms){
  quantityForm.addEventListener('submit', updateCartItem )
}


for (const deleteForm of deleteForms){
  deleteForm.addEventListener('submit', deleteCartItem )
}