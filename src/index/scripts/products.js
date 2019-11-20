let gridProducts = document.querySelectorAll('#products .product') ;
gridProducts.forEach(product=>product.addEventListener('mouseenter',startGridAnimation)) ;
gridProducts.forEach(product=>product.addEventListener('mouseleave',endGridAnimation)) ;
function startGridAnimation(e){
    let animationHelper = this.querySelector('.animationHelper') ;
    let img = this.querySelector('img') ;
    let offset = animationHelper.scrollHeight - img.offsetHeight ;
    animationHelper.style.transform = `translateY(-${offset}px)` ;
}
function endGridAnimation(e){
    let animationHelper = this.querySelector('.animationHelper') ;
    animationHelper.style.transform = `translateY(${0}px)` ;
}
