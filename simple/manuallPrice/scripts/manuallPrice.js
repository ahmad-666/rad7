//import form from '../../utilities/scripts/form.js' ;
let manualForm = document.querySelector('form#manual') ;
let manualFormObj = {
    manualForm,
    inputs:manualForm.querySelectorAll('.validate'),
    submit:manualForm.querySelector('button[type="submit"]'),
    modal:null,
    send:true ,
    labels:manualForm.querySelectorAll('.labelHandler')
}
new FormValidate(manualFormObj.reportForm,manualFormObj.submit,
    manualFormObj.inputs,manualFormObj.send,manualFormObj.modal) ;
    manualFormObj.labels.forEach(label=>new LabelHandler(label)) ;
manualForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})