var objEvent = objEvent || {};
(function(){ 
    var addEvent = function(){ 
      // some code
    };
    function removeEvent(){
      // some code
    }

    objEvent.addEvent = addEvent;
    objEvent.removeEvent = removeEvent;
})();

objEvent.addEvent = 2;
console.log(objEvent)
