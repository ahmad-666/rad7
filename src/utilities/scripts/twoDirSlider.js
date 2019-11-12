import util from '../../utilities/utilities.js' ;
class TwoDirSlider{
    constructor(wrapper,offset,timer){
        this.wrapper = wrapper ;
        this.timer = timer ;
        this.offset = offset ;
        this.sliders = this.wrapper.querySelectorAll('.sliderWrapper .slider') ;
        this.colorSlides = this.sliders[1].querySelectorAll('.slide:not(.empty)') ;
        this.dots = this.wrapper.querySelectorAll('.dot') ;
        this.btns = this.wrapper.querySelectorAll('.sliderWrapper .btn') ;
        this.currIndex = 0 ;
        this.prevActiveDotIndex = null ;
        this.movement = {} ; //check this.init
        this.slidesNum = this.sliders[0].querySelectorAll('.slide:not(.empty)').length ;
        this.dir = null ;
        this.init() ;
    }
    init(){
        this.colorSlides.forEach(colorSlide=>{
            let color = colorSlide.getAttribute('data-color') ;
            let bgColor = colorSlide.getAttribute('data-bgColor') ;
            let targetSlideID = colorSlide.getAttribute('data-target') ;
            let targetSlide = null ;
            colorSlide.style.color = color;
            colorSlide.style.backgroundColor = bgColor;
            if(targetSlideID){
                targetSlide = this.wrapper.querySelector(`#${targetSlideID}`) ;
                targetSlide.style.color = color;
                targetSlide.style.backgroundColor = bgColor;
            }     
        })  
        if(this.sliders[0].getAttribute('data-dir')=='top'||this.sliders[0].getAttribute('data-dir')=='right') this.movement.slider1 = -1*this.offset ;
        else if(this.sliders[0].getAttribute('data-dir')=='bottom'||this.sliders[0].getAttribute('data-dir')=='left') this.movement.slider1 = this.offset ;
        if(this.sliders[1].getAttribute('data-dir')=='top'||this.sliders[1].getAttribute('data-dir')=='right') this.movement.slider2 = -1*this.offset ;
        else if(this.sliders[1].getAttribute('data-dir')=='bottom'||this.sliders[1].getAttribute('data-dir')=='left')this.movement.slider2 = this.offset ;
        this.sliders.forEach(slider=>{
            if(slider.getAttribute('data-dir')=='top'||slider.getAttribute('data-dir')=='bottom') {
                slider.style.top='0%' ;
                this.dir = 'vertical' ;
            }
            else if(slider.getAttribute('data-dir')=='right'||slider.getAttribute('data-dir')=='left') {
                slider.style.right='0%' ;
                this.dir = 'horizontal' ;
            }
        })
        this.btns.forEach(btn=>btn.addEventListener('click',this.changeSlide.bind(this))) ;
        this.dots.forEach(dot=>dot.addEventListener('click',this.changeSlide.bind(this))) ;
        if(this.timer) this.initAutoSlider() ;   
    }
    initAutoSlider(){
        this.autoSliderClear = setInterval(()=>{
            this.autoSlider() ;
        },this.timer) ;    
    }
    autoSlider(){
        this.currIndex = this.currIndex+1<this.slidesNum?this.currIndex+1:0;
        this.dotsHandler() ;
        switch(this.dir){
            case 'vertical': 
                this.moveSlidesVertical('next') ;
                break ;
            case 'horizontal':
                this.moveSlidesHorizontal('next') ;
                break ; 
        }
    }
    changeSlide(e){
        clearInterval(this.autoSliderClear) ;
        let clickedElm = e.target ;
        let dir = null ;
        if(clickedElm.classList.contains('next')) {
            this.currIndex = this.currIndex+1<this.slidesNum?this.currIndex+1:0;
            dir = 'next' ;
        }
        else if(clickedElm.classList.contains('prev')) {
            this.currIndex = this.currIndex-1>=0?this.currIndex-1:this.slidesNum-1;
            dir = 'prev' ;
        }
        //click on dot
        else {
            this.prevActiveDotIndex = util.getActiveIndex(clickedElm.parentElement) ;
            this.currIndex = util.getChildIndex(clickedElm.parentElement,clickedElm) ;
            dir = 'dot' ;
        }            
        this.dotsHandler() ;
        switch(this.dir){
            case 'vertical': 
                this.moveSlidesVertical(dir) ;
                break ;
            case 'horizontal':
                this.moveSlidesHorizontal(dir) ;
                break ; 
        }
        this.initAutoSlider() ;
    }
    dotsHandler(){
        this.dots.forEach(dot=>dot.classList.remove('active')) ;
        this.dots[this.currIndex].classList.add('active') ;
    }
    moveSlidesVertical(dir){
        let slide1CurrPos = parseFloat(this.sliders[0].style.top);
        let slide2CurrPos = parseFloat(this.sliders[1].style.top);
        switch(dir){
            case 'next':
                if(this.currIndex!=0){
                    this.sliders[0].style.top = `${slide1CurrPos+this.movement.slider1}%` ; 
                    this.sliders[1].style.top = `${slide2CurrPos+this.movement.slider2}%` ; 
                }
                else {
                    this.sliders[0].style.top = `0%` ; 
                    this.sliders[1].style.top = `0%` ; 
                }     
                break;
            case 'prev':
                if(this.currIndex!=this.slidesNum-1){
                    this.sliders[0].style.top = `${slide1CurrPos-this.movement.slider1}%` ; 
                    this.sliders[1].style.top = `${slide2CurrPos-this.movement.slider2}%` ; 
                }
                else {
                    this.sliders[0].style.top = `${(this.slidesNum-1)*this.movement.slider1}%` ; 
                    this.sliders[1].style.top = `${(this.slidesNum-1)*this.movement.slider2}%` ; 
                }     
                break ;
            case 'dot':
                this.sliders[0].style.top = `${slide1CurrPos+((this.currIndex-this.prevActiveDotIndex)*this.movement.slider1)}%` ; 
                this.sliders[1].style.top = `${slide2CurrPos+((this.currIndex-this.prevActiveDotIndex)*this.movement.slider2)}%` ; 
                break ;
        }
    }
    moveSlidesHorizontal(dir){
        let slide1CurrPos = parseFloat(this.sliders[0].style.right);
        let slide2CurrPos = parseFloat(this.sliders[1].style.right);
        switch(dir){
            case 'next':
                if(this.currIndex!=0){
                    this.sliders[0].style.right = `${slide1CurrPos+this.movement.slider1}%` ; 
                    this.sliders[1].style.right = `${slide2CurrPos+this.movement.slider2}%` ; 
                }
                else {
                    this.sliders[0].style.right = `0%` ; 
                    this.sliders[1].style.right = `0%` ; 
                }     
                break;
            case 'prev':
                if(this.currIndex!=this.slidesNum-1){
                    this.sliders[0].style.right = `${slide1CurrPos-this.movement.slider1}%` ; 
                    this.sliders[1].style.right = `${slide2CurrPos-this.movement.slider2}%` ; 
                }
                else {
                    this.sliders[0].style.right = `${(this.slidesNum-1)*this.movement.slider1}%` ; 
                    this.sliders[1].style.right = `${(this.slidesNum-1)*this.movement.slider2}%` ; 
                }     
                break ;
            case 'dot':
                this.sliders[0].style.right = `${slide1CurrPos+((this.currIndex-this.prevActiveDotIndex)*this.movement.slider1)}%` ; 
                this.sliders[1].style.right = `${slide2CurrPos+((this.currIndex-this.prevActiveDotIndex)*this.movement.slider2)}%` ; 
                break ;
        }
    }
}
// import Slider from '../../utilities/scripts/twoDirSlide.js' ;
// new Slider(document.querySelector('#twoDirSlider'),200,2000) ;
//2000ms for auto timer and 200% for change each time ... pass null to timer if you dont 
//want auto slider
export default TwoDirSlider ;