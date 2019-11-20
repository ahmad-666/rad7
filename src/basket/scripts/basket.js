import Timeline from '../../utilities/scripts/timeline.js' ;
import Table from '../../utilities/scripts/table.js' ;
import Form from '../../utilities/scripts/form.js' ; 
//init variables 
let timelineWrapper = document.querySelector('#timelineWrapper') ;
let basketForm = document.querySelector('form#basket') ;
let stage1 = basketForm.querySelector('#stage1') ;
let stage2 = basketForm.querySelector('#stage2') ;
let table = stage1.querySelector('table') ;
let trs = table.querySelectorAll('tbody tr') ;
let totalPrice = stage1.querySelector('#totalPrice p:nth-child(2)') ;
let stage2Inputs = stage2.querySelectorAll('.validate') ;
let stage2Submit = stage2.querySelector('.btnWrapper button.next') ;
let stage2Labels = stage2.querySelectorAll('.labelHandler') ;
//init timeline
let progress = new Timeline.Progress(document.querySelector('#timeline'),500) ;
let timelineSlider = new Timeline.TimelineSlider(document.querySelector('#timelineSlider'),progress) ;
new Timeline.Timeline(timelineWrapper,progress,timelineSlider) ;
//init table
new Table(table,trs,totalPrice) ;
//init form 
stage2Labels.forEach(label=>new Form.LabelHandler(label)) ;
let basketFormSelectSearchs = basketForm.querySelectorAll('.inputWrapper.selectSearch') ;
basketFormSelectSearchs = [...basketFormSelectSearchs] ;
basketFormSelectSearchs.forEach(selectSearch => {
    let otherSelectSearchs = basketFormSelectSearchs.filter(other => {
        return (selectSearch!=other)
    }) 
    new Form.SelectSearch(selectSearch,otherSelectSearchs) ;
})
let basketFormValidation = new Form.FormValidate(basketForm,stage2Submit,stage2Inputs,false,null) ;
//timelineSlider validation
stage2Submit.addEventListener('click',checkFormValidation) ;
function checkFormValidation(e){
    if(basketFormValidation.validate) {
        timelineSlider.changeSlide(parseInt(e.currentTarget.getAttribute('data-slide')));
    }
}