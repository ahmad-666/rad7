import form from '../../utilities/scripts/form.js' ;
import util from '../../utilities/utilities.js' ;
let topMenu = document.querySelector('#topMenu') ;
let searchForm = topMenu.querySelector('form#searchForm') ;
let searchToggle = searchForm.querySelector('.searchToggle') ;
let searchInput = searchForm.querySelector('.inputWrapper.withSubmit') ;
let searchFormObj = {
    form: searchForm,
    inputs: searchForm.querySelectorAll('.validate'),
    submit: searchForm.querySelector('button[type="submit"]'),
    send: true ,
    modal: null
}
new form.FormValidate(searchFormObj.form,searchFormObj.submit,
    searchFormObj.inputs,searchFormObj.send,searchFormObj.modal) ;
searchToggle.addEventListener('click',toggleSearch) ;
function toggleSearch(e){
    e.stopPropagation();
    searchInput.classList.toggle('show') ;
    if(searchInput.classList.contains('show')){
        util.docHandler(searchInput,[]) ;
    }
}
topMenu.querySelector('.smoothScroll').addEventListener('click',e=>{
    let targetQuery = e.currentTarget.getAttribute('data-target') ;
    let target = document.querySelector(`#${targetQuery}`) ;
    window.scrollTo({
        behavior: "smooth" ,
        left: 0 ,
        top: target.getBoundingClientRect().top 
    })
})
