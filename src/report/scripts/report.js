import form from '../../utilities/scripts/form.js' ;
let reportWrapper = document.querySelector('#report') ;
let reportForm = reportWrapper.querySelector('form#admin') ;
let reportFormObj = {
    reportForm,
    inputs:reportForm.querySelectorAll('.validate'),
    submit:reportForm.querySelector('button[type="submit"]'),
    modal:null,
    send:true ,
    labels:reportForm.querySelectorAll('.labelHandler')
}
new form.FormValidate(reportFormObj.reportForm,reportFormObj.submit,
    reportFormObj.inputs,reportFormObj.send,reportFormObj.modal) ;
reportFormObj.labels.forEach(label=>new form.LabelHandler(label)) ;