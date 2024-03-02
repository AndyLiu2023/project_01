const toggleBtn = document.getElementsByClassName('question-toggle-btn');

console.dir(toggleBtn[0].parentElement.lastElementChild);
console.log(toggleBtn)

for (let i = 0 ; i < toggleBtn.length; i++){

    toggleBtn[i].addEventListener('click', () =>{
        const divElement = toggleBtn[i].parentElement.lastElementChild;
        if(divElement.style.maxHeight){
            divElement.style.borderRadius = '5px';
            divElement.style.display = 'none'
            divElement.style.maxHeight = null;
        }else {
            toggleBtn[i].parentElement.lastElementChild.style.borderRadius = '0 0 5px 5px';
            divElement.style.display = 'block'
            divElement.style.maxHeight = divElement.scrollHeight + 'px';
            
        }
    })

}


// for (let i = 0 ; i < toggleBtn.length; i++){

//     toggleBtn[i].addEventListener('click', () =>{
//         console.log('test');
//     })

// }
