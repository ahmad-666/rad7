import FontFaceObserver from 'fontfaceobserver' ;
import collapse from '../../utilities/scripts/collapse.js' ;
let filtersWrapper = document.querySelector('#filtersWrapper') ;
let currFiltersWrapper = filtersWrapper.querySelector('.currFilters') ;
let filtersForm = filtersWrapper.querySelector('form#filters') ;
filtersForm.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new collapse.Collapse(withCollapse,others));
});
//for solve conflicts of click event on label and click event on .collapseTrigger
filtersForm.querySelectorAll('label').forEach(label=>label.addEventListener('click',(e)=>e.stopPropagation()))
