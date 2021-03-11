/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//https://stackoverflow.com/questions/20835768/addeventlistener-on-custom-object


function UIelement() {
    this.isHighlighted = false;
    this.element = null;
    this.isPressed = false;
    this.events = null;
    this.onClick = null;
    this.onHighlight = null;
    
    this.eTextDefault = null;
    this.eTextClickedDefault = null;
    this.eTextHighlightedDefault = null;
    this.eText = null;
    this.eTextClicked = null;
    this.eTextHighlighted = null;
    this.enabled = true;
    
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);

UIelement.prototype.InitElement = function(obj){
    this.element = obj;
    this.events = [];
    
    this.eTextDefault = this.element.name;
    this.eTextClickedDefault = "Clicked!";
    this.eTextHighlightedDefault = "Highlighted!";
    this.eText = this.eTextDefault;
    this.eTextClicked = this.eTextClickedDefault;
    this.eTextHighlighted = this.eTextHighlightedDefault;
    this.enabled = true;
};
UIelement.prototype.setEnabled = function(isEnabled) {
    this.enabled = isEnabled;
};

UIelement.prototype.isEnabled = function() {
    return this.enabled;
};

UIelement.prototype.DrawElement = function (camera) {
    // forwards to subclass
    this.element._draw(camera);
};

UIelement.prototype.Update = function (camera) {
    // forwards to subclass
    this.element._update(camera);
};

UIelement.prototype.highlight = function(bool){
    this.element._highlight(bool);
};


UIelement.prototype.Click = function(){
    this.element._click();
};

UIelement.prototype.addListener = function(func, target){
    //var listener = func.bind(target);
    this.onClick = func.bind(target);
};

UIelement.prototype.isHeld = function() {
    return this.isPressed;
};

UIelement.prototype._mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.eButton.getXform().getXPos();
};
UIelement.prototype._mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.eButton.getXform().getYPos();
};



