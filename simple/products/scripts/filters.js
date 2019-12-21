//import FontFaceObserver from 'fontfaceobserver' ;
//import collapse from '../../utilities/scripts/collapse.js' ;
//import Filter from '../../utilities/scripts/filters.js' ;
//variables-----------------------------------
//----------------------------------------------
let filtersWrapper = document.querySelector('#filtersWrapper') ;
let currFiltersWrapper = filtersWrapper.querySelector('.currFilters .bottom') ;
let filtersForm = filtersWrapper.querySelector('form#filters') ;
let mainCategories = filtersForm.querySelectorAll('.mainCategory') ;
let clearAllBtn = currFiltersWrapper.parentElement.querySelector('#clearFilters') ;
//collapse-----------------------------------
//collapse----------------------------------------------
filtersForm.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
});
//for solve conflicts of click event on label and click event on .collapseTrigger
filtersForm.querySelectorAll('label').forEach(label=>label.addEventListener('click',(e)=>e.stopPropagation()))
//filter handler------------------------------------
let filterHandlerInstance = mainCategories.forEach(mainCategory=>new FilterHandler(currFiltersWrapper,mainCategory)) ;
new CurrFilterClearAll(currFiltersWrapper,filtersForm,clearAllBtn,filterHandlerInstance) ;
//filters handlers----------------------------------------------
