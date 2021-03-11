/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global gEngine, GameObject */
"use strict";

function Event (target, listener){
        this.target = target;
        this.listeners = [];
        this.listeners.push(listener);
};

Event.prototype.addListener = function(listener){
    this.listeners.push(listener);
};


