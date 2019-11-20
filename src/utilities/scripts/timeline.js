function Progress(progress,threshold){
    this.progress = progress ;
    this.threshold = threshold ;
    //when size of window gets bellow threshold we change height not width
    this.line = this.progress.querySelector('span.line') ;
    this.steps = this.progress.querySelectorAll('.step') ;
    this.stepsNum = this.steps.length ;
    this.lineOffset = Math.round(100/(this.stepsNum-1)) ; //as percent 
    this.currIndex = 0 ;
    if(window.innerWidth<=this.threshold) {
        this.line.style.width = '' ;
        this.line.style.height = '0%' ;
    }
}
Progress.prototype.changeStep = function(offset,dir){
    //offset is how many steps we moving not final index of target step
    this.currIndex += offset ;
    let lineCurrPos = null ;
    if(window.innerWidth>this.threshold) lineCurrPos = parseFloat(this.line.style.width) ;
    else lineCurrPos = parseFloat(this.line.style.height) ;
    if(offset>=0) { //we go forward
        this.steps.forEach((step,i)=>{
            if(i<=this.currIndex) step.classList.add('active') ;
            //else step.classList.remove('active') ;  
        })
    }
    else{//we go backward
        this.steps.forEach((step,i)=>{
            if(i>this.currIndex) step.classList.remove('active') ;    
            //else step.classList.add('active') ;
        })
    }
    if(window.innerWidth>this.threshold) this.line.style.width = `${lineCurrPos+(offset*this.lineOffset)}%` ;
    else this.line.style.height = `${lineCurrPos+(offset*this.lineOffset)}%` ;    
}
function TimelineSlider(slider,progress){
    this.slider = slider ;
    this.progress = progress ;
    this.changeSlideTriggers = this.slider.querySelectorAll('.changeSlide') ;
    this.changeSlideTriggers.forEach(changeSlide => {
        changeSlide.addEventListener('click',this.checkChangeSlide.bind(this)) ;
    })
}
TimelineSlider.prototype.checkChangeSlide = function(e){
    let btn = e.currentTarget ;
    let offset = parseInt(btn.getAttribute('data-slide')) ;
    if(!btn.classList.contains('validate')) this.changeSlide(offset) ;  
    //if 
    else{ //if we need validation
        //we need to write this manually when we create instance
        //if(something) this.changeSlide(offset) ;       
    }
}
TimelineSlider.prototype.changeSlide = function(offset){
    let currPos = parseFloat(this.slider.style.right) ;
    this.slider.style.right = `${currPos+(-1*offset*100)}%` ;
    this.progress.changeStep(offset) ;
}
function Timeline(timeline,progressInstance,sliderInstance){
    this.timeline = timeline ;
    this.progress = progressInstance
    this.slider = sliderInstance ;
}
//*** if we need validation for changing timeline slide we need to write 
//condition manually and also we need to add '.validate' to button too :
// <div class="slide" id="stage2">             
//     <div class="btnWrapper">
//         <button type="button" class="changeSlide prev" data-slide="-1">مرحله قبل</button>
//         <button type="button" class="changeSlide next validate" data-slide="1">مرحله بعد</button>
//     </div>
// </div>
// let progress = new Timeline.Progress(document.querySelector('#timeline'),500) ;
// let timelineSlider = new Timeline.TimelineSlider(document.querySelector('#timelineSlider'),progress) ;
// new Timeline.Timeline(document.querySelector('#timelineWrapper'),progress,timelineSlider) ;
// stage2Submit.addEventListener('click',checkFormValidation) ;
// function checkFormValidation(e){
//     if(<form>.validate) {
//         timelineSlider.changeSlide(parseInt(e.currentTarget.getAttribute('data-slide')));
//     }
// }
export default {
    Timeline ,
    TimelineSlider ,
    Progress
}