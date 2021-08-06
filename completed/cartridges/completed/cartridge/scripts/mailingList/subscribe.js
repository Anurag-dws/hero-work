'use strcit';

function subscribe (emailArgs) {
    var D= new Date();
    

    
    var Transaction = require('dw/system/Transaction');
    var CustomObjectMgr = require('dw/object/CustomObjectMgr'); 
    Transaction.begin();
   
       try {
        var TimeStamp =  D.getTime().toString(); 
   var NewCustomObject = CustomObjectMgr.createCustomObject('test', TimeStamp);
   NewCustomObject.custom.timeStamp= TimeStamp;
   NewCustomObject.custom.email= emailArgs;

     Transaction.commit();
   }
   catch (e) {
   
           Transaction.rollback();
   
       }

       // check whether cusotm object is crated or not;
      var seek= CustomObjectMgr.getAllCustomObjects('test');
      var list = seek.asList(0,seek.getCount());
     

      var ret="ttt";
}

exports.subscribe= subscribe;