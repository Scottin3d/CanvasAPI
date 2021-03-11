/* global UIcanvas */

"use strict";
/*<summary>Adds a UI element to the UIelements array.</summary>   
 *<param = element> An object, a UI element to be added to the canvas.</param>   
 */
UIcanvas.prototype._AddElement = function (element){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    this.UIElements.push(element);
};

/*<summary>Creates a UI element.</summary>   
 *<param = arguments> Any number of arguments can be passed into this function.  
 *Arg[0] is the element type, Arg[1+] are the arguments for the element constructor.</param>   
 */
UIcanvas.prototype.CreateElement = function(){
    var type = arguments[0];                                                    // gets the type from UIELEM_TYPES.  No need to validate.  Invalid types doto default which is error.
    switch(type){
        case this.UIELEM_TYPES.Button:
            if(arguments.length !== 5){ alert("Invalid arguments"); }           // a button has five (5) arguments
            this._createButton(arguments);
            return;
        case this.UIELEM_TYPES.Slider:
            if(arguments.length !== 6){ alert("Invalid arguments"); }           // a slider has six (6) arguments
            this._createSlider(arguments);
            return;
        default:
            alert("Invalid UI element type");
    }
    
};

/*<summary>Creates a button UI elements.  A user defined event controller.</summary>   
 *<param = arguments> An array[5], [type, size[2], pos[2], color[4], text""].</param>   
 */
UIcanvas.prototype._createButton = function(args){
    // function UIButton(size, pos, color, text)
    // check args
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

UIcanvas.prototype._createSlider = function(args){
    //function UISlider (size, pos, range, dValue, vStep)
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