const expandBtn = document.getElementById('expand-btn');

const quickAddBtns = document.querySelectorAll('.add-cart-btn');
const quicksection =document.querySelector('.quick-section');
const quickdiv = document.querySelector('.quick-add-to-cart-window');
const quickclose = document.getElementById('quick-close');
const quickAddBtnPop = document.getElementById('quick-add-btn');

const quickImg = document.getElementById('quick-img');
const quickName = document.getElementById('quick-name');
const quickSize = document.getElementById('quick-size');
const quickSizeSelect = document.getElementById('sizes-options');
const quickColorSelect = document.getElementById('colors-options');
const quickColor = document.getElementById('quick-color');
const quickPrice = document.getElementById('quick-price');
const quickNumber = document.getElementById('select');

const badgeElements = document.querySelectorAll('.badge01');



// async function getSingleProduct(event){

//     event.preventDefault();

//     let response;
//     console.log('clicked');
//     console.dir(event);
//     const pro = event.target.dataset.productuid
//     try {
//         response = await fetch(`/item/${pro}`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 productUid: pro
//         }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
        
//     } catch (error) {
//         alert('Something went wrong!');
//         return;
//     }

//     if (!response.ok) {
//         alert('Something went wrong!');
//         return;
//       }

//     const responseData = await response.json();
//       console.log(responseData.name)

//       quicksection.style.display ='flex';
//       quickdiv.style.display ='flex';
    
// }


async function getSingleProductGET(event){
    event.preventDefault();


    let response;
    console.log('clicked');
    const productuid = event.target.dataset.productuid
    try {
        response = await fetch(`/item/${productuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong, response!');
        return;
      }

    const responseData = await response.json();

      quickImg.setAttribute('src', `/product-data/product-images/${responseData.image}`);
      quickName.textContent = responseData.name;
      quickPrice.textContent = `NT$ ${responseData.price}`;

      quickNumber.selectedIndex = 0;
      


      if(quickSizeSelect.length > 0 && quickColorSelect.length > 0){
        quickAddBtnPop.setAttribute('data-productuid', '');
        while(quickSizeSelect.lastElementChild){
            quickSizeSelect.lastElementChild.remove();
        }

        while(quickColorSelect.lastElementChild){
            quickColorSelect.lastElementChild.remove();
        }
        
      }
      quickAddBtnPop.setAttribute('data-productuid', responseData.uid);


      for (let i = 0; i < responseData.sizes.length; i++ ){
        if(responseData.sizes[i] !== 'null' ){
            
            const options = document.createElement('option');
            options.setAttribute('value', responseData.sizes[i]);
            const optionText = responseData.sizes[i];
            options.textContent = optionText;
            quickSizeSelect.appendChild(options);

        }
      }

      for (let i = 0; i < responseData.colors.length; i++ ){
        if(responseData.colors[i] !== 'null' ){
            
            const options = document.createElement('option');
            options.setAttribute('value', responseData.colors[i]);
            const optionText = responseData.colors[i];
            options.textContent = optionText;
            quickColorSelect.appendChild(options);

        }
      }


      quicksection.style.display ='block';
      quickdiv.style.display ='flex';
    
}




function closeQuickSection(){
    quicksection.style.display ='none';
    quickdiv.style.display ='none';


}


// quick add ajax

async function addToCart(event){
    event.preventDefault();
    const productUid = quickAddBtnPop.dataset.productuid;
    const CSRFToken = event.target.previousElementSibling.value;


    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productUid: productUid,
                size: quickSizeSelect.value,
                color: quickColorSelect.value,
                buyNumber: quickNumber.value,
                CSRFToken:  CSRFToken,

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
        quickAddBtnPop.parentElement.parentElement.appendChild(successText);

        setTimeout(function(){ successText.remove();
        ;
       }, 1000);

    }

    //   quicksection.style.display ='none';
    //   quickdiv.style.display ='none';

    const responseData = await response.json();
    const newTotalQuantity = responseData.newTotalItems;

    for(const badgeElement of badgeElements){
        badgeElement.textContent = newTotalQuantity;
    }

}



expandBtn.addEventListener('click', toggleCat);

for (const quickAddBtn of quickAddBtns){

    quickAddBtn.addEventListener('click', getSingleProductGET);
}

quickdiv.addEventListener('click', closeQuickSection);
quickclose.addEventListener('click', closeQuickSection);
quickAddBtnPop.addEventListener('click', addToCart);


// 暫時不用

// const lielements = document.querySelectorAll('.product-options');

// function checklitext(text){
//     if (text === 'null'){
//         return true
//     }
// }

// function removenull(value, index){
//     let a = value.textContent;

//     if(!checklitext(a)){ 
//         return
//     }else{
//         lielements[index].classList.add('removeli');
//         }

// }


// lielements.forEach(removenull);


// lielements[index].classList.add('removeli');
// for (a = 0; a < i; a++){

//     let text =lielements[a].textContent
    
//     if(checkli(text)){

//         lielements[a].classList.add('removeli');
// }

// }
