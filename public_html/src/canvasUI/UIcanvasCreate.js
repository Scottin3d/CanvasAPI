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


UIcanvas.prototype.CreateElement = function(){
    var type = arguments[0];
    switch(type){
        case this.UIELEM_TYPES.Button:
            if(arguments.length !== 5){ alert("Invalid arguments"); }
            this._createButton(arguments);
            return;
        case this.UIELEM_TYPES.Slider:
            if(arguments.length !== 6){ alert("Invalid arguments"); }
            this._createSlider(arguments);
            return;
        default:
            alert("Invalid UI element type");
    }
    
};
// function UIButton(size, pos, color, text)
UIcanvas.prototype._createButton = function(args){
    var size = args[1];
    if(size.length !== 2){ return; }
    var pos = args[2];
    if(pos.length !== 2){ return; }
    var color = args[3];
    if(color.length !== 4){ return; }
    var text = args[4];
    
    var newButton = new UIButton(size, pos, color, text);
    this._AddElement(newButton);
};

//function UISlider (size, pos, range, dValue, vStep)
UIcanvas.prototype._createSlider = function(args){
    // check args
    var size = args[1];
    if(size.length !== 2){ return; }
    var pos = args[2];
    if(pos.length !== 2){ return; }
    var range = args[3];
    if(range.length !== 2){ return; }
    var dValue = args[4];
    if(typeof dValue !== 'number'){ return; }
    var vStep = args[5];
    if(typeof vStep !== 'number'){ return; }
    
    var newSlider = new UISlider(size, pos, range, dValue, vStep);
    this._AddElement(newSlider);
};