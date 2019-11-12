document.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
}) ;
let nav = document.querySelector('nav') ;
let mobileNavWrapper = nav.querySelector('.bars') ;
let mobileBars = mobileNavWrapper.querySelector('.fa-bars') ;
let mobileNav = mobileNavWrapper.querySelector('ul.mobile') ;
let mobileFullScreenTriggers = mobileNav.querySelectorAll('li.fullScreen .fullScreenTrigger');
let mobileFullScreenCloses = document.querySelectorAll('.fullScreenMenu .close') ;
mobileBars.addEventListener('click',toggleMobileNav) ;
function toggleMobileNav(e){
   mobileNav.classList.toggle('show') ;
   if(mobileNav.classList.contains('show')){
      document.addEventListener('click',mobileDocHandler) ;
   }
   else{
      document.removeEventListener('click',mobileDocHandler) ;
   }
}
function mobileDocHandler(e){
   let clickedElm = e.target ;
   if(!mobileNavWrapper.contains(clickedElm)){
      mobileNav.classList.remove('show') ;
      document.removeEventListener('click',mobileDocHandler) ;
   }
}
mobileFullScreenTriggers.forEach(fsTrigger => fsTrigger.addEventListener('click',openMobileFullScreen)) ;
mobileFullScreenCloses.forEach(fsClose=>fsClose.addEventListener('click',closeMobileFullScreen)) ;
function openMobileFullScreen(e){
   let targetFsID = this.getAttribute('data-target') ;
   let targetFs = document.querySelector(`#${targetFsID}`) ;
   document.body.classList.add('disableScroll') ;
   targetFs.classList.add('show') ;
}
function closeMobileFullScreen(e){
   let fs = this.parentElement ;
   document.body.classList.remove('disableScroll') ;
   fs.classList.remove('show') ;
}
