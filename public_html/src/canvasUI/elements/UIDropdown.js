/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function UIDropdown(size, pos, color, text, options) {
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setSize(size[0], size[1]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this
    this.InitElement(this);
    //this.element = this;
    //this.events = [];
    //this.dispatcher = new OurDispatcher();
    this.eOptions = options;
    for(var i = 0; i < this.eOptions.length; i++) {
        this.eOptions[i].setEnabled(false);
    }
    
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0] - (size[0] / 3),  pos[1]);
    this.eTextRenderable.setTextHeight(size[1] / 4);
    
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    
    GameObject.call(this, this.eButton);
};

gEngine.Core.inheritPrototype(UIDropdown, UIelement);

UIDropdown.prototype._update = function (camera) {
    for(var i = 0; i < this.eOptions.length; i++) {
        this.eOptions[i].setEnabled(false);
    }
    // not highlighted not clicked
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
        this.eText = this.eTextDefault;
    }
    
    // highlighted not clicked
    if(this.isHighlighted && !this.isClicked){
        this.eText = this.eTextHighlighted;
        for(var i = 0; i < this.eOptions.length; i++) {
            this.eOptions[i].setEnabled(true);
        }
    }
    
    // clicked
    if(this.isClicked){
        this.eText = this.eTextClicked;
    }
    
    this.eTextRenderable.setText(this.eText); 
    this.isClicked = false;
    this.isHighlighted = false;
//    for(var i = 0; i < this.eOptions.length; i++) {
//        this.eOptions[i].update(camera);
//    }
};

UIDropdown.prototype._draw = function (camera) {
    this.eButton.draw(camera);
    this.eTextRenderable.draw(camera);
};



UIDropdown.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eButton.setColor([1,1,0,1]);
    }else{
        this.eButton.setColor([1,1,1,1]);
    }
};

UIDropdown.prototype.setHeight = function(height) {
    this.eButton.getXform().setHeight(height);
};

UIDropdown.prototype._click = function(){
    this.isClicked = true;
    this.eButton.setColor([1,0,1,1]);
    this.eText = "Clicked!";
    this._invoke(0.5);
};

UIDropdown.prototype._invoke = function(value){
    this.onClick(value);
};

UIDropdown.prototype.setText = function(text){
    this.eText = text;
};