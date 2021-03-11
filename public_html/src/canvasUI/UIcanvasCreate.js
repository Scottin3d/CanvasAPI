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

UIcanvas.prototype.CreateDropdown = function(size, pos, color, text, options){
    var optionButtons = [];
    for(var i = 0; i < options.length; i++) {
        var newOpt = new UIButton([size[0], size[1] / 2], [pos[0], pos[1] - ((size[1] / 2) * (i + 1) + (size[1] / 4))], [color[0],color[1],color[2] - 0.1 * i,color[3]], options[i]);
//        newOpt.setColor([color[0],color[1],color[2],color[3] - 0.01 * i]);
//        newOpt.getXform().setSize(size[0], size[1] / 2);
//        newOpt.getXform().setPosition(pos[0], pos[1] - ((size[1] / 2) * (i + 1) + (size[1] / 4)));
        optionButtons.push(newOpt);
        this._AddElement(newOpt);
    }
    var newDropdown = new UIDropdown(size, pos, color, text, optionButtons);
    this._AddElement(newDropdown);
};

//function UISlider (pos, size, range, dValue, vStep)
UIcanvas.prototype.CreateSlider = function(size, pos, range, dValue, vStep){
    var newSlider = new UISlider(size, pos, range, dValue, vStep);
    this._AddElement(newSlider);
};