/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var OurDispatcher, dispatcher;

OurDispatcher = (function() {
  function OurDispatcher() {
    this.dispatchHandlers = [];
  };
  
  OurDispatcher.prototype.on = function(eventName, handler) {
    switch (eventName) {
      case "dispatch":
        return this.dispatchHandlers.push(handler);
      case "somethingElse":
        return alert('write something for this event :)');
    }
  };

  OurDispatcher.prototype.dispatch = function() {
    var handler, i, len, ref;
    ref = this.dispatchHandlers;
    for (i = 0, len = ref.length; i < len; i++) {
      handler = ref[i];
      setTimeout(handler, 0);
    }
  };

  return OurDispatcher;

})();