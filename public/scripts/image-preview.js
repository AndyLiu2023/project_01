const InputElement = document.querySelector('.imageUpload-area input');
const imageElement = document.querySelector('.imageUpload-area img');

console.log(imageElement.src);

if(imageElement.src ==='http://localhost:3000/newproduct'){
  imageElement.style.display = 'none';
}else{
  imageElement.style.display = 'block';
}


function updateImagePreview() {
    const files = InputElement.files;
  
    if (!files || files.length === 0) {
        imageElement.style.display = 'none';
      return;
    }
    

  
    const pickedFile = files[0];
  
    imageElement.src = URL.createObjectURL(pickedFile);
    imageElement.style.display = 'block';
  }
  
  InputElement.addEventListener('change', updateImagePreview);