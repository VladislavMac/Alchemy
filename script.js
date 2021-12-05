"use strict"

// variable
const 
      footerItem   = document.querySelectorAll('.footer-all_item .item'),
      allItem      = document.querySelector('.main-all_item'),
      buttonResult = document.querySelector('.result');
      
let 
    userIngredients = {
        'fire' : 'Огонь',
        'water' : 'Вода',
        'cold' : 'Холод',
        'little-tree' : 'Росток',
        'machete' : 'Мачете',
        'stone' : 'Камень'
    },
    itemIcon        = '',
    itemAlt         = '';

const allMix = {
    'snow' : [ 'snowflake', 'snowflake', 'Снег'],
    'sun' : ['fire', 'fire', 'Солнце'],
    'snowflake' : ['snow-rain', 'snow-rain', 'Снежинка'],
    'ice-cube' : ['ice', 'machete', 'Кубики льда'],
    'ice-water' : ['water', 'ice-cube', 'Холодная вода'],
    'ice' : ['water', 'cold', 'Лед'],
    'mountain' : ['stone', 'stone', 'Гора'],
    'snow-mountain' : ['mountain', 'snow-rain', 'Снежные горы'],
    'snow-man' : ['snow', 'snow', 'Снеговик'],
    'desertification' : ['little-tree', 'fire', '?'], 
    'river' : ['water', 'water', 'Река'],
    'steam' : ['fire','water', 'Пар'],
    'rain' : ['steam', 'steam', 'Дождь'],
    'forest-fire' : ['forest', 'fire', 'Лес горит'],
    'arctic' : ['ice', 'ice', 'Север'],
    'tree' : ['little-tree', 'rain', 'Дерево'],
    'snow-rain' : ['rain', 'cold', 'Снегопад'],
    'grass' : ['little-tree', 'little-tree', 'Трава'],
    'forest' : ['tree', 'tree', 'Лес'],
    'christmas-tree' : ['tree', 'snow', 'Елка'],
    'christmas-tree-snow' : ['christmas-tree', 'snow-rain', 'Снежная Елка'],
    'beam' : ['machete', 'fire', 'Сталь'],
    'nail' : ['beam', 'fire', 'Гвозди'],
    'wood' : ['tree', 'machete', 'Бревно'],
    'house' : ['wood', 'nail', 'Дом'],
    'snow-house' : ['house', 'snow-rain', 'Снежный дом'],
    'ocean' : ['river', 'river', 'Океан'],
    'sea' : ['ocean', 'ocean', 'Море'],
    'life' : ['sea', 'sea', 'Жизнь'],
    'fish' : ['sea', 'life', 'Рыба'],
    'meat-fish' : ['fish', 'machete', 'Мясо рыбы'],
    'wolf' : ['forest', 'life', 'Волк'],
    'dog' : ['house', 'wolf', 'Собака'],
    'big-dog' : ['snow-house', 'wolf', 'Большая собака'],
    'penguin' : ['arctic', 'life', 'Пингвин']
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
                if( footerItem[0].getAttribute('alt') == 'dog' && footerItem[1].getAttribute('alt') == 'machete' ){
                    localStorage.clear();
                }else if( footerItem[0].getAttribute('alt') == 'big-dog' && footerItem[1].getAttribute('alt') == 'machete'){
                    localStorage.clear();
                }else {
                    if( allMix[key][0] == footerItem[0].getAttribute('alt') &&  allMix[key][1] == footerItem[1].getAttribute('alt')){
                        userIngredients[key] = allMix[key][2];
                        localStorage.setItem(key, allMix[key][2]);
                        window.location.reload();
                    }
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
