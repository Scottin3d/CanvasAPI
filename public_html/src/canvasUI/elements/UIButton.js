/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function UIButton(size, pos, color, text) {
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    this.eButton.getXform().setSize(size[0], size[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this
    this.InitElement(this);
    //this.element = this;
    //this.events = [];
    //this.dispatcher = new OurDispatcher();
    
    
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(0,  pos[1]);
    this.eTextRenderable.setTextHeight(5);
    
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    
    GameObject.call(this, this.eButton);
};

gEngine.Core.inheritPrototype(UIButton, UIelement);

UIButton.prototype._update = function (camera) {
    // not highlighted not clicked
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
        this.eText = this.eTextDefault;
    }
    
    // highlighted not clicked
    if(this.isHighlighted && !this.isClicked){
        this.eText = this.eTextHighlighted;
    }
    
    // clicked
    if(this.isClicked){
        this.eText = this.eTextClicked;
    }
    
    this.eTextRenderable.setText(this.eText); 
    this.isClicked = false;
    this.isHighlighted = false;
};

UIButton.prototype._draw = function (camera) {
    this.eButton.draw(camera);
    this.eTextRenderable.draw(camera);
};



UIButton.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eButton.setColor([1,1,0,1]);
    }else{
        this.eButton.setColor([1,1,1,1]);
    }
};

UIButton.prototype.setHeight = function(height) {
    this.eButton.getXform().setHeight(height);
};

UIButton.prototype._click = function(){
    this.isClicked = true;
    this.eButton.setColor([1,0,1,1]);
    this.eText = "Clicked!";
    this._invoke(0.5);
};

UIButton.prototype._invoke = function(value){
    this.onClick(value);
};

UIButton.prototype.setText = function(text){
    this.eText = text;
};