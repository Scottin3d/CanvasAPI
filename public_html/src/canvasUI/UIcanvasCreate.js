/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// this.UIElements = [];

UIcanvas.prototype._AddElement = function (element){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    this.UIElements.push(element);
};

// function UIButton(size, pos, color, text)
UIcanvas.prototype.CreateButton = function(size, pos, color, text){
    var newButton = new UIButton(size, pos, color, text);
    this._AddElement(newButton);
};

//function UISlider (pos, size, range, dValue, vStep)
UIcanvas.prototype.CreateSlider = function(size, pos, range, dValue, vStep){
    var newSlider = new UISlider(size, pos, range, dValue, vStep);
    this._AddElement(newSlider);
};