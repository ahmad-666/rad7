import ProductSlider from '../../utilities/scripts/productSlider';
let productInfo = document.querySelector('form#productInfo') ;
new ProductSlider(productInfo.querySelector('#info .productSlider'),document.querySelector('.fix_productSlider')) ;