import util from '../utilities.js' ;
class Table{
    constructor(table,trs,totalPriceElm){ //trs --> querySelectorAll('tr')
        this.table = table ;
        this.trs = trs ;
        this.totalPriceElm = totalPriceElm ;
        this.totalPrice = 0 ;
        this.rows = [] ;
        this.search = this.table.querySelector('thead .inputSearch input') ;
        this.init() ;
    }
    init(){
        this.trs.forEach(tr=>this.rows.push(new TableRow(tr,this)))
        this.rows.forEach(row=>{this.totalPrice += row.price});
        this.totalPriceElm.textContent = '' ;
        this.totalPriceElm.textContent = `${this.totalPrice}تومان` ;
        this.search.addEventListener('input',this.searching.bind(this)) ;
    }
    updateBasket(price,ops){
        switch(ops){
            case 'add':
                this.totalPrice+=price ;
                break ;
            case 'sub':
                this.totalPrice-=price ;
                break;
            default :
                console.error('this cas has not been handled inside Table constructor') ;
        }
        this.totalPriceElm.textContent = `${this.totalPrice}تومان` ;
    }
    searching(e){
        let val = this.search.value ;
        this.rows.forEach(row=>{       
            if(row.name.toUpperCase().includes(val)){//find search value
                row.tr.classList.add('show') ;
                row.tr.classList.remove('hide') ;
            }
            else { //not search value
                row.tr.classList.add('hide') ;
                row.tr.classList.remove('show') ;
            }
        })

    }
}
class TableRow{
    constructor(tr,table){
        this.tr = tr ;
        this.table = table ;
        this.name = this.tr.querySelector('.prodName .info p').textContent ;
        this.price = parseFloat(this.tr.getAttribute('data-unit-price')) ;
        this.quantityElm = this.tr.querySelector('.inputWrapper.numberHandler input:not([type="hidden"])') ;
        this.increase = this.quantityElm.parentElement.querySelector('.increase');
        this.decrease = this.quantityElm.parentElement.querySelector('.decrease') ;
        this.hidden = this.quantityElm.parentElement.querySelector('input[type="hidden"]') ;//for check quantity threshold
        this.minQuantity = parseInt(this.quantityElm.getAttribute('data-min')) ;
        this.maxQuantity = parseInt(this.quantityElm.getAttribute('data-max')) ;
        this.quantityStep = parseInt(this.quantityElm.getAttribute('data-step')) ;
        this.quantity = parseInt(this.quantityElm.value) ;
        this.priceTxt = this.tr.querySelector('.prodPrice p:nth-child(1)') ;
        this.removeRow = this.tr.querySelector('.removeRow') ;
        this.clone = null ; //clone of entire <tr> (needed for search)
        this.init() ;
    }
    init(){
        this.priceTxt.textContent = '' ;
        this.priceTxt.textContent = `${this.price}تومان` ;
        this.hidden.value = this.quantity ;
        this.increase.addEventListener('click',this.increaseQuantity.bind(this)) ;
        this.decrease.addEventListener('click',this.decreaseQuantity.bind(this)) ;
        this.removeRow.addEventListener('click',this) ;
        this.cloneRow() ;
    }
    increaseQuantity(e){
        this.hidden.value = this.quantity+1 ;
        this.quantityElm.value = this.quantity+1<=this.maxQuantity?this.quantity+1:this.quantity ;
        this.quantity = parseInt(this.quantityElm.value) ; //get tha latest quantity 
        if(parseInt(this.hidden.value)<=this.maxQuantity) this.updatePrice('add') ;
    }
    decreaseQuantity(e){
        this.hidden.value = this.quantity-1 ;
        this.quantityElm.value = this.quantity-1>=this.minQuantity?this.quantity-1:this.quantity ;
        this.quantity = parseInt(this.quantityElm.value) ; //get tha latest quantity 
        if(parseInt(this.hidden.value)>=this.minQuantity) this.updatePrice('sub') ;
    }
    updatePrice(ops){
        this.quantity = parseInt(this.quantityElm.value) ; //get tha latest quantity 
        if(this.quantity>0){
            this.priceTxt.textContent = `${this.price*this.quantity}تومان` ;
            this.table.updateBasket(this.price,ops) ;
        }
    }
    handleEvent(e){//for remove row
        this.quantity = parseInt(this.quantityElm.value) ; //get tha latest quantity 
        this.removeRow.removeEventListener('click',this) ;
        this.tr.parentElement.removeChild(this.tr) ;
        this.table.updateBasket(this.price*this.quantity,'sub') ;
    }
    cloneRow(){
        this.clone = this.tr.cloneNode(true) ;
    }
}
// let basketForm = document.querySelector('form#basket') ;
// let table = basketForm.querySelector('table') ;
// let trs = table.querySelectorAll('tbody tr') ;
// let totalPrice = basketForm.querySelector('#totalPrice p:nth-child(2)') ;
// new Table(table,trs,totalPrice) ;
export default Table ;
