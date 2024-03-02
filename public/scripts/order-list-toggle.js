const orderListBtn = document.getElementsByClassName('section-button');


for (let i = 0 ; i < orderListBtn.length; i++){

    orderListBtn[i].addEventListener('click', () =>{
        const asideElement = orderListBtn[i].parentElement.parentElement.nextElementSibling
        if(asideElement.style.maxHeight){
            orderListBtn[i].parentElement.parentElement.style.borderRadius = '5px';
            asideElement.style.maxHeight = null;
        }else {
            orderListBtn[i].parentElement.parentElement.style.borderRadius = '5px 5px 0 0';
            asideElement.style.maxHeight = asideElement.scrollHeight + 'px';
        }
    })

}