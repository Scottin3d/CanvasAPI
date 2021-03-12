/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, GameObject */
"use strict";

function UIEvent (name){
    this.eventName = name;
    this.listeners = [];
    this.values = [];
};

UIEvent.prototype.AddListener = function(listener, value){
    this.listeners.push(listener);
    this.values.push(value);
};

UIEvent.prototype.Invoke = function(){
    for (var i = 0; i < this.listeners.length; i++) {
        var val = (this.values[i] === null)? arguments[0] : this.values[i];
        this.listeners[i](val);
    }
};




