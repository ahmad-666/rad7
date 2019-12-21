//import Form from '../../utilities/scripts/form.js' ;
let editProfileForm = document.querySelector('form#editProfile') ;
let editProfileFormData = {
    elm: editProfileForm,
    submit:editProfileForm.querySelector('button[type="submit"]') ,
    inputs: editProfileForm.querySelectorAll('.validate'),
    selects: editProfileForm.querySelectorAll('.inputWrapper.selectSearch'),
    send:true,
    modal:null,
    labels:editProfileForm.querySelectorAll('.labelHandler')
}
editProfileFormData.labels.forEach(label=>new LabelHandler(label)) ;
new FormValidate(editProfileFormData.elm,editProfileFormData.submit,
    editProfileFormData.inputs,editProfileFormData.send,
    editProfileFormData.modal) ;
editProfileFormData.selects = [...editProfileFormData.selects] ;
editProfileFormData.selects.forEach(selectSearch => {
    let otherSelectSearchs = editProfileFormData.selects.filter(other => {
        return (selectSearch!=other)
    }) 
    new Form.SelectSearch(selectSearch,otherSelectSearchs) ;
})