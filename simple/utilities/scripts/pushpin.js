class Pushpin {
    constructor(pushpins){
        this.pushpins = pushpins ;
        this.init() ;
    }
    init(){window.addEventListener('scroll',this.pushpinMonitor.bind(this)) ;}
    pushpinMonitor(e){
        this.pushpins.forEach(pushpin=>{
            if(pushpin.getBoundingClientRect().top<0){
                pushpin.classList.add('fix') ;
                this.pushpins.forEach(innerPushpin=>{
                    if(pushpin!=innerPushpin) innerPushpin.classList.remove('fix') ;
                })
            }
        })
    }
}
//new Pushpin(document.querySelectorAll('.pushpin')) ;
export default Pushpin ;