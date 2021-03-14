/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - @MadArkadian
 * Nicholas Chambers - @SeleniumEclipse
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";

function UIDropdown(type, size, pos, color, text) {
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setSize(size[0], size[1]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this
    this._initElement(this);
    this.eType = type;
    
    this.eOptions = [];
    
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0] - (size[0] / 3),  pos[1]);
    this.eTextRenderable.setTextHeight(size[1] / 4);
    
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    this.clickBuffer = false;
    
    this.isClicked = false;
    
    GameObject.call(this, this.eButton);
    
    return this;
};

gEngine.Core.inheritPrototype(UIDropdown, UIelement);

UIDropdown.prototype.addOption = function(option) {
    console.log(option.isEnabled());
    option.setEnabled(false);
    this.eOptions.push(option);
};

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
    }
    
    // clicked
    if(this.isClicked){
        this.eText = this.eTextClicked;
        for(var i = 0; i < this.eOptions.length; i++) {
            this.eOptions[i].setEnabled(true);
        }
    }
    
    this.eTextRenderable.setText(this.eText); 
    //this.isClicked = false;
    this.isHighlighted = false;
//    for(var i = 0; i < this.eOptions.length; i++) {
//        this.eOptions[i].update(camera);
//    }
};
UIDropdown.prototype.AddListener = function(func, target, options){
    //var listener = func.bind(target);
    console.log("getting a listener");
    for(var i = 0; i < this.eOptions.length; i++) {
        console.log(options[i]);
        this.eOptions[i].AddListener(this._invoke, this, options[i]);
    }
    this.onClick = func.bind(target);
};
UIDropdown.prototype._draw = function (camera) {
    this.eButton.draw(camera);
    this.eTextRenderable.draw(camera);
};

//UIDropdown.prototype.getXform = function() {
//    if(this.isClicked) {
//        console.log("i am highlighted");
//        var tempHeight = this.eButton.getXform().getHeight();
//        tempHeight += tempHeight * (this.eOptions.length / 2);
//        var tempYPos = this.eButton.getXform().getYPos();
//        tempYPos += this.eButton.getXform().getHeight() / 2;
//        tempYPos -= tempHeight / 2;
//        var tempXform = new Transform();
//        tempXform.setSize(this.eButton.getXform().getWidth(), tempHeight);
//        tempXform.setPosition(this.eButton.getXform().getXPos(), tempYPos);
//        return tempXform;
//    } else {
//        return this.eButton.getXform();
//    }
//};

UIDropdown.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eButton.setColor([1,1,0,1]);
    }else{
        this.eButton.setColor([1,1,1,1]);
    }
};
UIDropdown.prototype.getType = function() {
    return "dropdown";
};
UIDropdown.prototype.setHeight = function(height) {
    this.eButton.getXform().setHeight(height);
};

UIDropdown.prototype._click = function(){
    this.isClicked = !this.isClicked;
    this.eButton.setColor([1,0,1,1]);
    
    //this.eText = "Clicked!";
    //this._invoke(0.5);
};

UIDropdown.prototype._invoke = function(value){
    this.onClick(value);
};

UIDropdown.prototype.setText = function(text){
    this.eText = text;
};