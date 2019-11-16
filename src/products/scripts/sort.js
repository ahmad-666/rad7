import form from '../../utilities/scripts/form.js' ;
let sortForm = document.querySelector('form#sort') ;
sortForm.querySelectorAll('.labelHandler').forEach(label=>new form.LabelHandler(label)) ;
let sortFormSelects = sortForm.querySelectorAll('.inputWrapper.select') ;
sortFormSelects.forEach(select=>{
    let selects = [...sortFormSelects] ;
    let otherSelects = selects.filter(other => (select!=other)) 
    new form.Select(select,otherSelects) ;
})
