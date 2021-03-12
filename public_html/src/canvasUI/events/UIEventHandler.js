"use strict";

// NOT USED CURRENTLY
function UIEventHandler(){
    this.events = [];
};

UIEventHandler.prototype.AddEvent = function(event){
    var name = event.eventName;
    var obj = { name : event};
    this.events.push(obj);
    
};

// TODO remove event


