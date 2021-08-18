$(document).ready(function () {
  //Anurag
    $('.drive, .frameSet,.wheels, .components, .extra').slideUp();
   $('.driveBtn').on('click',function () {
  
        $('.drive').toggle(500);
      
   })

   $('.frameSetBtn').on('click',function () {
    $('.frameSet').toggle(500);
   })
  
   $('.wheelsBtn').on('click',function () {
      
    $('.wheels').toggle(500);
   })

   $('.componentsBtn').on('click',function () {
    $('.components').toggle(500);
   })

   $('.extraBtn').on('click',function () {
     $('.extra').toggle(500);
    })

});