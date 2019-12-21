//import form from '../../utilities/scripts/form.js' ;
//import ProductSlider from '../../utilities/scripts/productSlider.js';
let productInfo = document.querySelector('form#productInfo') ;
new ProductSlider(productInfo.querySelector('#info .productSlider'),document.querySelector('.fix_productSlider')) ;
productInfo.querySelectorAll('.inputWrapper.numberHandler').forEach(numberHandler => new NumberHandler(numberHandler))