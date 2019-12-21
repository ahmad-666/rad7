//import form from '../../utilities/scripts/form.js' ;
let commentWrapper = document.querySelector('#comment') ;
let commentForm = commentWrapper.querySelector('form#commentForm') ;
let commentFormObj = {
    commentForm,
    inputs:commentForm.querySelectorAll('.validate'),
    submit:commentForm.querySelector('button[type="submit"]'),
    modal:null,
    send:true ,
    labels:commentForm.querySelectorAll('.labelHandler')
}
new FormValidate(commentFormObj.commentForm,commentFormObj.submit,
    commentFormObj.inputs,commentFormObj.send,commentFormObj.modal) ;
commentFormObj.labels.forEach(label=>new LabelHandler(label)) ;