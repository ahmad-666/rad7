import util from '../../utilities/utilities.js' ;
let aside = document.querySelector('aside') ;
aside.querySelectorAll('.ellipse').forEach(ellipse=>new util.Ellipse(ellipse))