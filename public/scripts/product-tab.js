let tabTitle = document.getElementsByClassName('tab-title');
let tabContent = document.getElementsByClassName('tab-content');
const defaultTab =document.getElementsByClassName('tab-title')[0];
defaultTab.click();
function switchTab(event , tab){
    let i 
    for(i = 0; i < tabContent.length; i ++){
        tabContent[i].style.display = 'none';
        tabTitle[i].classList.remove('active');
    }

    

    document.getElementById(tab).style.display = 'block';
    event.currentTarget.className += ' active';
}