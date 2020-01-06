//copy bellow code to <target>.js file
//import form from '../../utilities/scripts/form.js' ;
let checkCodeForm = document.querySelector('form#checkCode') ;
let checkCodeSubmit = checkCodeForm.querySelector('button[type="submit"]') ;
let checkCodeInputs = checkCodeForm.querySelectorAll('.validate') ;
new FormValidate(checkCodeForm,checkCodeSubmit,checkCodeInputs,true,null) ;
checkCodeForm.querySelectorAll('.labelHandler').forEach(labelHandler => {
    new LabelHandler(labelHandler) ;
})