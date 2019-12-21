//import form from '../../utilities/scripts/form.js' ;
//import ProductSlider from '../../utilities/scripts/productSlider.js';
//import Modal from '../../utilities/scripts/modal.js' ;
let productInfo = document.querySelector('form#productInfo') ;
new ProductSlider(productInfo.querySelector('#info .productSlider'),document.querySelector('.fix_productSlider')) ;
productInfo.querySelectorAll('.inputWrapper.numberHandler').forEach(numberHandler => {
    let initVal = parseFloat(numberHandler.getAttribute('data-init'));
    let changeElm = document.querySelector(`#${numberHandler.getAttribute('data-change-target')}`) ;
    let append = numberHandler.getAttribute('data-append') ;
    new NumberHandler(numberHandler,initVal,changeElm,append);
}) ;
document.querySelectorAll('.modalTrigger').forEach(trigger=>new Modal([trigger],[],false)) ;