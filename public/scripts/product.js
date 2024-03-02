const addSizeOptionBtn = document.getElementById('add-Size-option-a');
const addColorOptionBtn = document.getElementById('add-Color-option-a');


const colorUl = document.getElementById('colorUl');
const sizeUl = document.getElementById('sizesUl');


// let labelnumSize = 1;
// let labelnumColor = 1;

let labelnumSize = sizeUl.children.length;
let labelnumColor = colorUl.children.length;
// let lastLiElement = sizeUl.lastElementChild;

    if(labelnumSize > 1 ){
        
        const deleteBtn = document.createElement('a');
        const deleteBtnText = document.createTextNode('刪除');
        deleteBtn.setAttribute('id', `deleteSizesOption_${labelnumSize}`);
        deleteBtn.setAttribute('onclick', 'deleteSizeOptions()');
        deleteBtn.appendChild(deleteBtnText);
    
        sizeUl.lastElementChild.firstElementChild.appendChild(deleteBtn);
        
    }
    
    if(labelnumColor > 1 ){

        const deleteBtn = document.createElement('a');
        const deleteBtnText = document.createTextNode('刪除');
        deleteBtn.setAttribute('id', `deleteColorsOption_${labelnumColor}`);
        deleteBtn.setAttribute('onclick', 'deleteColorOptions()');
        deleteBtn.appendChild(deleteBtnText);
        
        colorUl.lastElementChild.firstElementChild.appendChild(deleteBtn);
        
    }
    



function addSizeOptions(){


if(labelnumSize < 5 ){
    labelnumSize++;
    const liElement = document.createElement('li');
    
    
    const labelElement = document.createElement('label');
    const labelElementText = document.createTextNode(`尺吋規格 ${labelnumSize}`);
    labelElement.setAttribute('for', `sizes_${labelnumSize}`);


    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', `sizes_${labelnumSize}`);
    inputElement.setAttribute('name', 'sizes');
    const deleteBtn = document.createElement('a');
    const deleteBtnText = document.createTextNode('刪除');
    deleteBtn.setAttribute('id', `deleteSizesOption_${labelnumSize}`);
    deleteBtn.setAttribute('onclick', 'deleteSizeOptions()');
    deleteBtn.appendChild(deleteBtnText);


    labelElement.appendChild(labelElementText);
    liElement.appendChild(labelElement);
    liElement.appendChild(deleteBtn);
    liElement.appendChild(inputElement);
   



    sizeUl.appendChild(liElement);
  

    if(labelnumSize > 2){
        let i = labelnumSize -1;

        const preDeleteBtn = document.getElementById(`deleteSizesOption_${i}`);
        
        preDeleteBtn.remove();
    }else{
        return;
    }

    
    
}else{
    alert('選填最多五欄!');
    return;
}


}


function addColorOptions(){

    
    
    if(labelnumColor < 5 ){
        labelnumColor++;
        const liElement = document.createElement('li');
        const labelElement = document.createElement('label');
        const labelElementText = document.createTextNode(`顏色 ${labelnumColor}`);
        labelElement.setAttribute('for', `colors_${labelnumColor}`);
    
    
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        inputElement.setAttribute('id', `colors_${labelnumColor}`);
        inputElement.setAttribute('name', 'colors');
        const deleteBtn = document.createElement('a');
        const deleteBtnText = document.createTextNode('刪除')
        deleteBtn.setAttribute('id', `deleteColorsOption_${labelnumColor}`);
        deleteBtn.setAttribute('onclick', 'deleteColorOptions()');
        deleteBtn.appendChild(deleteBtnText);
    
    
        labelElement.appendChild(labelElementText);
        liElement.appendChild(labelElement);
        liElement.appendChild(deleteBtn);
        liElement.appendChild(inputElement);
        
    
        colorUl.appendChild(liElement);

        if(labelnumColor > 2){
            let i = labelnumColor -1;
    
            const preDeleteBtn = document.getElementById(`deleteColorsOption_${i}`);
            
            preDeleteBtn.remove();
        }else{
            return;
        }
       


    }else{
        alert('選填最多五欄!');
        return;
    }
    
    
    }





function deleteSizeOptions(){


    labelnumSize = sizeUl.childElementCount;
    labelnumSize--;

   let lastLiElement = sizeUl.lastElementChild;
   lastLiElement.remove();
   lastLiElement = sizeUl.lastElementChild;

    const label = document.getElementById(`sizes_${labelnumSize}`)
    const deleteBtn = document.createElement('a');
    const deleteBtnText = document.createTextNode('刪除');
    deleteBtn.setAttribute('id', `deleteSizesOption_${labelnumSize}`);
    deleteBtn.setAttribute('onclick', 'deleteSizeOptions()');
    deleteBtn.appendChild(deleteBtnText);
    if(labelnumSize < 2 ){
        return;
    }else{
        // lastLiElement.appendChild(deleteBtn);
        lastLiElement.firstElementChild.appendChild(deleteBtn);
        
    }
    
    
}

function deleteColorOptions(){


    labelnumColor = colorUl.childElementCount;
    labelnumColor--;

   let lastLiElement = colorUl.lastElementChild;
   lastLiElement.remove();
   lastLiElement = colorUl.lastElementChild;


    const deleteBtn = document.createElement('a');
    const deleteBtnText = document.createTextNode('刪除');
    deleteBtn.setAttribute('id', `deleteColorsOption_${labelnumColor}`);
    deleteBtn.setAttribute('onclick', 'deleteColorOptions()');
    deleteBtn.appendChild(deleteBtnText);
    if(labelnumColor < 2 ){
        return;
    }else{
        lastLiElement.firstElementChild.appendChild(deleteBtn);
    }
    
    
}



addSizeOptionBtn.addEventListener('click', addSizeOptions);
addColorOptionBtn.addEventListener('click', addColorOptions);