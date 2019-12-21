//import Form from '../../utilities/scripts/form.js' ;
let changePassForm = document.querySelector('form#changePassword') ;
let changePassFormData = {
    elm: changePassForm,
    submit:changePassForm.querySelector('button[type="submit"]') ,
    inputs: changePassForm.querySelectorAll('.validate'),
    send:true,
    modal:null,
    labels:changePassForm.querySelectorAll('.labelHandler')
}
changePassFormData.labels.forEach(label=>new LabelHandler(label)) ;
new FormValidate(changePassFormData.elm,changePassFormData.submit,
    changePassFormData.inputs,changePassFormData.send,
    changePassFormData.modal) ;