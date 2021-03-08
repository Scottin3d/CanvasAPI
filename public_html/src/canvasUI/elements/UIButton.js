/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function UIButton(color, pos, size) {
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    this.eButton.getXform().setSize(size[0], size[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this
    this.element = this;
    this.dispatcher = new OurDispatcher();
    
    this.eText = new FontRenderable("Status");
    this.eText.setColor([0, 0, 0, 1]);
    this.eText.getXform().setPosition(0,  pos[1]);
    this.eText.setTextHeight(5);
    
    this.bText = "status!";
    
    GameObject.call(this, this.eButton);
};


gEngine.Core.inheritPrototype(UIButton, UIelement);

UIButton.prototype._update = function (camera) {
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
    }
    
    if(this.isHighlighted){
        this.eText.setText("Highlighted!");
    }else{
       this.eText.setText(this.bText); 
    }
    
};

UIButton.prototype._draw = function (camera) {
    this.eButton.draw(camera);
    this.eText.draw(camera);
};

UIButton.prototype._mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.eButton.getXform().getXPos();
};
UIButton.prototype._mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.eButton.getXform().getYPos();
};

UIButton.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eButton.setColor([1,1,0,1]);
    }else{
        this.eButton.setColor([1,1,1,1]);
    }
};


UIButton.prototype.click = function(){
    this.eButton.setColor([1,0,1,1]);
    this.bText = "Clicked!";
    this._invoke(5);
    this.setText(5);
};

UIButton.prototype._invoke = function(value){
    this.onClick(value);
};

UIButton.prototype.setText = function(text){
    this.bText = text;
};