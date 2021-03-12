/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

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


