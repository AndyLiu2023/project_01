const createBtn = document.getElementById('create-Btn');
const newPostArea = document.getElementById('newPost-Area');
const closeNewPostAreaBtn = document.getElementById('closeNewPost-Btn');

const contentBtn = document.getElementById('content-Btn');


function toggleOnCreateNewPostArea(){

    // newPostArea.classList.toggle('open');
  
    newPostArea.style.left = '0%';
}

function toggleOffCreateNewPostArea(){

    // newPostArea.classList.toggle('open');
  
    newPostArea.style.left = '200%';
}




createBtn.addEventListener('click', toggleOnCreateNewPostArea);
closeNewPostAreaBtn.addEventListener('click', toggleOffCreateNewPostArea);
