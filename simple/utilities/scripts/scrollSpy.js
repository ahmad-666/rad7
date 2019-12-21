import util from '../utilities.js' ;
class ScrollSpy{
    constructor(scrollSpyWrapper){
        this.scrollSpyWrapper = scrollSpyWrapper ;
        this.scrollSpyList = this.scrollSpyWrapper.querySelector('.scrollSpyList');
        this.scrollSpyElms = this.scrollSpyWrapper.querySelector('.scrollSpyElms');
        this.scrollSpys = this.scrollSpyElms.querySelectorAll('.scrollSpy') ;
        this.init() ;
    }
    init(){
        window.addEventListener('scroll',this.scrollMonitor.bind(this)) ;
    }
    scrollMonitor(e){
        if(this.scrollSpyWrapper.getBoundingClientRect().top<0){
            this.scrollSpyList.classList.add('fix') ;
            //we need to add new style to .scrollSpyElms
            let scrollSpyWrapperWidth = parseFloat(util.pxToEm(this.scrollSpyWrapper.offsetWidth,this.scrollSpyWrapper)) ;
            let scrollSpyListWidth = parseFloat(util.pxToEm(this.scrollSpyList.offsetWidth,this.scrollSpyList)) ;  
            this.scrollSpyElms.style.width = `${scrollSpyWrapperWidth-scrollSpyListWidth}em` ;    
            this.scrollSpyElms.style.marginRight = `${scrollSpyListWidth+2}em` ; //'2' is for add space    
            this.scrollSpyChecker() ;
        }
        else { //reset above changes
            this.scrollSpyList.classList.remove('fix') ;
            this.scrollSpyElms.style.width = `` ;    
            this.scrollSpyElms.style.marginRight = `` ; 
        }
    }
    scrollSpyChecker(){
        this.scrollSpys.forEach(scrollSpy=>{
            if(scrollSpy.getBoundingClientRect().top<0){
                this.scrollSpyList.querySelector('li.active').classList.remove('active') ;
                let targetID = scrollSpy.getAttribute('data-target')
                this.scrollSpyList.querySelector(`#${targetID}`).classList.add('active') ;
            }
        })
    }
}
//new ScrollSpy(document.querySelector('.scrollSpyWrapper')) ;
export default ScrollSpy ;