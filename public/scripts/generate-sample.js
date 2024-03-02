const previewBtn = document.getElementById('preview-generate-a');
const productForm = document.querySelector('.create-Product-form');
const sumbitBtn = document.getElementById('submit');

function submitForm(){
    window.open("/admin/samplePage", "mozillaWindow");
    console.dir(productForm);
    console.dir(productForm[2].value);
}





// async function getPreviewPage(){
    
 
//     const a = productForm[2].value;
//     console.log(a);
//     let response;

//     try {
//         response = await fetch('/admin/samplepage',{
//             method: 'POST',
//             body: JSON.stringify({
//                 a: a,
//             }),
//             header: {
//                 'Content-Type':'multipart/json'
//             }

//         })
//     } catch (error) {
        
//     }

//     const responseData = await response.json();

    
 

// }



// previewBtn.addEventListener('click', getPreviewPage)