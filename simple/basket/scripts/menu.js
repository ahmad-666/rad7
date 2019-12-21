let sideMenuTrigger = document.querySelector('#sideMenuTrigger') ;
let blackFilter = document.querySelector('#blackFilter') ;
let sideMenu = document.querySelector('aside') ;
sideMenuTrigger.addEventListener('click',toggleSideMenu) ;
function toggleSideMenu(e){
    e.stopPropagation();
    sideMenuTrigger.classList.toggle('move') ;
    sideMenuTrigger.classList.toggle('fa-bars') ;
    sideMenuTrigger.classList.toggle('fa-times') ;
    sideMenu.classList.toggle('show') ;
    blackFilter.classList.toggle('show') ;
    if(sideMenu.classList.contains('show')) document.addEventListener('click',sideMenuDocHandler) ; 
    else document.removeEventListener('click',sideMenuDocHandler) ; 
}
function sideMenuDocHandler(e){
    e.stopPropagation() ;
    let clickedElm = e.target ;
    if(!sideMenu.contains(clickedElm)){
        document.removeEventListener('click',sideMenuDocHandler) ;
        sideMenuTrigger.classList.remove('move') ;
        sideMenuTrigger.classList.add('fa-bars') ;
        sideMenuTrigger.classList.remove('fa-times') ;
        sideMenu.classList.remove('show') ;
        blackFilter.classList.remove('show') ;
    }
}