
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


 function random_  (i,j) {
	
    
     var x  = Math.floor(randomNumber(31,10007));
    // console.log("x value is " + x);
     //make polynomial value;
     let a=7;
     let b= 29;
     var pol_val = x;//a*x*x + b*x + + a*b;  //error with polynomial getting even value only.
      pol_val = pol_val % (j-i) + i;
      
      //console.log("pol value is : "+ pol_val);
    
      return pol_val;

     
}
exports.random_ = random_;