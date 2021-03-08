/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function UISlider (pos, size, range, dValue, vStep){
    // values
    this.minValue = range[0];
    this.minPos = null;
    this.maxValue = range[1];
    this.maxPos = null;
    this.eSliderValue = dValue;
    this.dispatcher = new OurDispatcher();
    
    // two renderables -- bar and nob
    this.eSlidierBar = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eSlidierBar.setColor([1,1,1,1]);
    this.eSlidierBar.getXform().setPosition(pos[0], pos[1]);
    this.eSlidierBar.getXform().setSize(size[0], size[1]);
    
    
    // pos = (x - (size / 2)) + size * (dvalue / range[1])
    this.minPos = (pos[0]- (size[0] / 2)) + size[0] * ( range[0] / range[1]);
    this.maxPos = (pos[0]- (size[0] / 2)) + size[0] * ( range[1] / range[1]);
    var nobXPos = (pos[0]- (size[0] / 2)) + size[0] * (dValue / range[1]);
    this.eSliderNob = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eSliderNob.setColor([0,0,1,1]);
    this.eSliderNob.getXform().setPosition(nobXPos, pos[1]);
    this.eSliderNob.getXform().setSize(size[1] * 2, size[1] * 2);
 
    this.element = this;
    this.isPressed = false;
    
GameObject.call(this, this.eSliderNob);
};
gEngine.Core.inheritPrototype(UISlider, UIelement);

UISlider.prototype._update = function (camera) {
    if(this.isHighlighted && gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)){
        this.isPressed = true;
        // TODO let mouse move off nob and still slide as long as mouse down
        var mouseX = camera.mouseWCX();
        var pos = this.eSliderNob.getXform().getPosition();
        var size = this.eSliderNob.getXform().getSize();
        
        //var nobXPos = (pos[0]- (size[0] / 2)) + size[0] * (this.eSliderValue / this.maxValue);
        //var nobXPos = pos[0] + size[0] * (this.eSliderValue / this.maxValue);
        //console.log(pos[0], this.maxPos, this.minPos, Math.floor(((pos[0] - this.minPos) / 60) * this.maxValue));//, this.maxPos + (size[0] / 2), Math.floor(nobXPos / (this.maxPos + (size[0] / 2)) * this.maxValue));
        
        this.eSliderValue = Math.floor(((pos[0] - this.minPos) / 60) * this.maxValue);
        // calc mouse directon
        // apply to nob
        // clamp value
        if(mouseX <= this.maxPos && mouseX >= this.minPos){
            this.eSliderNob.getXform().setPosition(mouseX, pos[1]);
            this.invoke(this.eSliderValue);
            // fire event
        }
        
    }else{
        this.isPressed = false;
    }
};

UISlider.prototype._draw = function (camera) {
     this.eSlidierBar.draw(camera);
     this.eSliderNob.draw(camera);
};

UISlider.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.eSliderNob.setColor([1,1,0,1]);
    }else{
        this.eSliderNob.setColor([0,0,1,1]);;
    }
};


UISlider.prototype.click = function(){
    this.eSliderNob.setColor([1,0,1,1]);
};

UISlider.prototype.invoke = function(value){
    //this.dispatcher.dispatch();
    this.clickFunc(value.toString());
};