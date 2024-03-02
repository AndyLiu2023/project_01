const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuArea = document.getElementById('mobile-menu')
const mobileToggleOffBtn = document.getElementById('toggleOffDropdownBtn');
const mobileDropdownInfo = document.getElementById('dropDown-info');
const mobileDropdownItemsInfo = document.getElementById('dropDownItems-Info');
const mobileDropdownGood = document.getElementById('dropDown-good');
const mobileDropdownItemsgood = document.getElementById('dropDownItems-good');

const restNavLis = document.querySelectorAll('.rest-nav-li');

function toggleNav(){
    // mobileMenuArea.classList.toggle('open');
    mobileMenuArea.style.height = '100%';
   
}

function toggleOffNav(){
    // mobileMenuArea.classList.remove('open');
    mobileMenuArea.style.height = '0%';
    mobileDropdownItemsInfo.classList.remove('open');
    mobileDropdownItemsgood.classList.remove('open');
  
   
}

function toggleDropdownInfo(){
    mobileDropdownItemsInfo.classList.toggle('open-info');

}

function toggleDropdownGood(){
    mobileDropdownItemsgood.classList.toggle('open-good');
}


function toggleCat(){
    for( const restNavLi of restNavLis) {
        restNavLi.classList.toggle('expand');
    }
    
    }

mobileMenuBtn.addEventListener('click', toggleNav);

mobileToggleOffBtn.addEventListener('click', toggleOffNav);

mobileDropdownInfo.addEventListener('click', toggleDropdownInfo);

mobileDropdownGood.addEventListener('click', toggleDropdownGood);