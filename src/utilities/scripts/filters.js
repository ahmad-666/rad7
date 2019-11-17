class FilterHandler{
    constructor(currFiltersWrapper,mainCategory){
       this.currFiltersWrapper = currFiltersWrapper ;
       this.mainCategory = mainCategory ;
       this.mainCheckbox = this.mainCategory.querySelector('input[type="checkbox"]') ;
       this.subCategories = this.mainCategory.parentElement.querySelectorAll('.subCategory') ;
       this.subCheckboxes = [] ;
       this.init() ;
    }
    init(){
       this.mainCategory.querySelector('.checkbox').addEventListener('click',this.toggleMain.bind(this)) ;
       this.mainCategory.querySelector('label').addEventListener('click',e=>e.stopPropagation());
       this.subCategories.forEach(subCategory=>{
          subCategory.addEventListener('click',this.toggleSub.bind(this));
          subCategory.querySelector('label').addEventListener('click',e=>e.stopPropagation());
          this.subCheckboxes.push(subCategory.querySelector('input[type="checkbox"]')) ;
       }) ;
    }
    toggleMain(e){
       e.stopPropagation() ;
       this.mainCheckbox.checked = (this.mainCheckbox.checked)?true:false ; //toggle main checkbox
       if(this.mainCheckbox.checked){ 
          this.createCurrFilter(this.mainCheckbox) ; //add mainCheckbox to currFilters
          this.subCheckboxes.forEach(subCheckbox=>{
             //if we dont already check/add subCheckbox then do it
             if(!this.currFiltersWrapper.querySelector(`#curr_${subCheckbox.getAttribute('id')}`)){ 
                subCheckbox.checked = true ; //check all subCheckboxes 
                this.createCurrFilter(subCheckbox) ;  //add all subCheckboxes to currFilters 
             }  
          })
       }  
       else{
          this.removeCurrFilter(this.mainCheckbox) ; //remove mainCheckbox to currFilters
          this.subCheckboxes.forEach(subCheckbox=>{
             //only if subCheckbox is checked/exists inside currFilter unCheck/remove it
             if(this.currFiltersWrapper.querySelector(`#curr_${subCheckbox.getAttribute('id')}`)){
                subCheckbox.checked = false ; //uncheck all subCheckboxes 
                this.removeCurrFilter(subCheckbox) ; //remove all subCheckboxes from currFilters 
             }     
          })
       }    
    }
    toggleSub(e){
       e.stopPropagation() ;
       let currentSubCheckbox = e.currentTarget.querySelector('input[type="checkbox"]') ;   
       let activeSubCheckboxNum = -1 ;
       this.subCheckboxes.forEach(subCheckbox=>{
          if(subCheckbox.checked) activeSubCheckboxNum++ ;
       })
       currentSubCheckbox.checked = (currentSubCheckbox.checked)?true:false;
       if(currentSubCheckbox.checked){
          //if we dont check and add mainCheckbox already then do it  
          if(!activeSubCheckboxNum){
             this.mainCheckbox.checked = true ; //check main Category
             this.createCurrFilter(this.mainCheckbox) ; //add main category to currFilters
          }
          this.createCurrFilter(currentSubCheckbox) ; //add currentSub to currFilter 
       }
       else{
          //only when we uncheck all subCheckboxes we should remove mainCategory
          if(activeSubCheckboxNum<0){
             this.mainCheckbox.checked = false ; //uncheck main Category
             this.removeCurrFilter(this.mainCheckbox) ; //remove main category from currFilters
          } 
          this.removeCurrFilter(currentSubCheckbox) ; //remove currentSub from currFilter 
       }
    }
    createCurrFilter(target){ //we pass checkbox to it 
       let currFilter = document.createElement('div') ;
       currFilter.classList.add('currFilter') ;
       currFilter.setAttribute('id',`curr_${target.getAttribute('id')}`) ;
       let closeIcon = document.createElement('i') ;
       closeIcon.classList.add('fas','fa-times','close') ;
       let text = document.createElement('p') ;
       text.textContent = target.parentElement.querySelector('p').textContent ;
       currFilter.appendChild(closeIcon) ;
       currFilter.appendChild(text) ;
       this.currFiltersWrapper.appendChild(currFilter) ;
       closeIcon.addEventListener('click',this) ;
    }
    removeCurrFilter(target){ //we pass checkbox to it 
       let currFilter = this.currFiltersWrapper.querySelector(`#curr_${target.getAttribute('id')}`) ;
       this.currFiltersWrapper.removeChild(currFilter) ;
    }
    handleEvent(e){
       let currFilter = e.currentTarget.parentElement ;
       let filterID = currFilter.getAttribute('id').split('_')[1] ;
       let filterCheckbox = this.mainCategory.parentElement.querySelector(`#${filterID}`) ; //checkbox
       let activeSubCheckboxNum = 0 ;
       if(filterCheckbox.parentElement.parentElement.parentElement.classList.contains('mainCategory')){
          this.mainCheckbox.checked = false ; //unCheck main checkbox 
          let mainFilterID = `curr_${this.mainCheckbox.getAttribute('id')}` ;
          let mainFilter = this.currFiltersWrapper.querySelector(`#${mainFilterID}`) ;
          mainFilter.querySelector('.close').removeEventListener('click',this) ;
          this.currFiltersWrapper.removeChild(mainFilter) ; //remove mainCurrFilter
          //remove all subFilters / unCheck all sub checkboxes
          this.subCheckboxes.forEach(subCheckbox=>{
             subCheckbox.checked = false ;
             let currSubCheckboxID = `curr_${subCheckbox.getAttribute('id')}` ;
             let currSubFilter = this.currFiltersWrapper.querySelector(`#${currSubCheckboxID}`) ;
             //if corresponding CurrFilter exits then remove it 
             if(currSubFilter) this.currFiltersWrapper.removeChild(currSubFilter) ; 
          })
       }
       else if(filterCheckbox.parentElement.classList.contains('subCategory')){
          e.currentTarget.removeEventListener('click',this) ; 
          this.currFiltersWrapper.removeChild(currFilter) ; //remove filter from currFilter
          filterCheckbox.checked = false ; //unCheck checkbox
          //if its last subCategory then unCheck main too
          this.subCheckboxes.forEach(subCheckbox=>{
             if(subCheckbox.checked) activeSubCheckboxNum++ ;
          })
          if(!activeSubCheckboxNum){
             this.mainCheckbox.checked = false ;
             let mainCurrFilterID = `curr_${this.mainCheckbox.getAttribute('id')}` ;
             let mainCurrFilter = this.currFiltersWrapper.querySelector(`#${mainCurrFilterID}`) ;
             mainCurrFilter.querySelector('.close').removeEventListener('click',this) ;
             this.currFiltersWrapper.removeChild(mainCurrFilter) ;
          }
       }
    }
}
class CurrFilterClearAll{
    constructor(currFiltersWrapper,filtersWrapper,clearAllBtn,filterHandlerInstance){
        this.currFiltersWrapper = currFiltersWrapper ;
        this.filtersWrapper = filtersWrapper ;
        this.clearAllBtn = clearAllBtn ;
        this.checkboxes = this.filtersWrapper.querySelectorAll('input[type="checkbox"]') ;
        this.filterHandlerInstance = filterHandlerInstance ;
        this.init() ;
    }
    init(){
        this.clearAllBtn.addEventListener('click',this.clearAll.bind(this)) ;
    }
    clearAll(e){
        //clear all currFilters
        while(this.currFiltersWrapper.children.length) {
            this.currFiltersWrapper.lastChild.querySelector('.close').removeEventListener('click',this.filterHandlerInstance) ;
            this.currFiltersWrapper.removeChild(this.currFiltersWrapper.lastChild) ;
        }
        //unCheck all checkbox 
        this.checkboxes.forEach(checkbox=>checkbox.checked = false)     
    } 
}
// import FontFaceObserver from 'fontfaceobserver' ;
// import collapse from '../../utilities/scripts/collapse.js' ;
// import Filter from '../../utilities/scripts/filters.js' ;
// //variables-----------------------------------
// let filtersWrapper = document.querySelector('#filtersWrapper') ;
// let currFiltersWrapper = filtersWrapper.querySelector('.currFilters .bottom') ;
// let filtersForm = filtersWrapper.querySelector('form#filters') ;
// let mainCategories = filtersForm.querySelectorAll('.mainCategory') ;
// let clearAllBtn = currFiltersWrapper.parentElement.querySelector('#clearFilters') ;
// //collapse-----------------------------------
// filtersForm.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
//    all = [...all] ;
//    let others = all.filter(elm =>elm!=withCollapse);
//    let font = new FontFaceObserver('iranSans');
//    font.load().then(()=>new collapse.Collapse(withCollapse,others));
// });
// //for solve conflicts of click event on label and click event on .collapseTrigger
// filtersForm.querySelectorAll('label').forEach(label=>label.addEventListener('click',(e)=>e.stopPropagation()))
// //filter handler------------------------------------
// let filterHandlerInstance = mainCategories.forEach(mainCategory=>new Filter.FilterHandler(currFiltersWrapper,mainCategory)) ;
// new Filter.CurrFilterClearAll(currFiltersWrapper,filtersForm,clearAllBtn,filterHandlerInstance) ;
export default {
     FilterHandler ,
     CurrFilterClearAll
 }