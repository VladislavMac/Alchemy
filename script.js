"use strict"

// variable
const 
      footerItem   = document.querySelectorAll('.footer-all_item .item'),
      allItem      = document.querySelector('.main-all_item'),
      buttonResult = document.querySelector('.result');
      
let 
    userIngredients = {
        'fire' : 'Огонь',
        'rain' : 'Дождь',
        'cold' : 'Холод',
        'little-tree' : 'Росток'
    },
    itemIcon        = '',
    itemAlt         = '';

const allMix = {
    'snow' : [ 'snow-rain', 'snow-rain', 'Снег'],
    'igloo' : ['snow', 'snow', 'Игла'],
    'tree' : ['little-tree', 'rain', 'Дерево'],
    'snow-rain' : ['rain', 'cold', 'Снегопад'],
    'water' : ['rain', 'rain', 'Вода']
}

// Data in localStorage
for(let i=0; i< localStorage.length; i++) {
    let LocalKey = localStorage.key(i);
    // userIngredients[LocalKey] = localStorage.getItem(LocalKey);
    userIngredients[LocalKey] = localStorage.getItem(LocalKey);
}


// Created ingredients
for( let key in userIngredients ){
    localStorage.setItem(key, userIngredients[key]);
    
    allItem.innerHTML += `
    <div class="wrapper-item">
        <div alt='${key}' style="background-image: url(img/icon-item/${key}.png);" class="item">
        </div>            
        <div class="desc">
            <p>${userIngredients[key]}</p>
        </div>        
    </div>
    `
}
const mainItem = document.querySelectorAll('.main-all_item .item');

// Select clicked item
for( let i = 0; i < mainItem.length; i++ ){
    mainItem[i].addEventListener('click', function selectItem(){
        clearSelectItem();
        mainItem[i].classList.add('active')
        itemIcon = mainItem[i].style.backgroundImage;
        itemAlt  = mainItem[i].getAttribute('alt');
    });
};

// Clear select item
function clearSelectItem(){
    mainItem.forEach((item) =>{
        item.classList.remove('active')
    })
}

// If user select item and click add ingredient
for( let k = 0; k < footerItem.length; k++ ){

    buttonResult.addEventListener('click', function clickResult(){
        if( footerItem[k].style.backgroundImage == '' ||
            footerItem[0].style.backgroundImage == '' ||
            footerItem[1].style.backgroundImage == ''){
            console.log(0)
        }else{
            for( let key in allMix ){
                if( allMix[key][0] == footerItem[0].getAttribute('alt') &&  allMix[key][1] == footerItem[1].getAttribute('alt')){
                    userIngredients[key] = allMix[key][2];
                    localStorage.setItem(key, allMix[key][2]);
                    window.location.reload();
                }
            }
        }
    })

    footerItem[k].addEventListener('click', function ingredient(){
        if( footerItem[k].style.backgroundImage == '' ){
            footerItem[k].style.backgroundImage = itemIcon;
            footerItem[k].setAttribute('alt', itemAlt);
        }else{
            footerItem[k].style.backgroundImage = '';
        }
    });
};
