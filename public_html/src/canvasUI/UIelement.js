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
    
    
    this.dispatcher = new OurDispatcher();
    
    this.onClick = null;
    //const event = document.createEvent('Event');
    //event.initEvent('click', true, true);
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);


UIelement.prototype.drawElement = function (camera) {
    // forwards to subclass
    this.element._draw(camera);
};

UIelement.prototype.update = function (camera) {
    // forwards to subclass
    this.element._update(camera);
};

UIelement.prototype.highlight = function(bool){
    this.element._highlight(bool);
};


UIelement.prototype.eClick = function(bool){
    this.element.highlight(bool);
};

UIelement.prototype.addListener = function(func, target){
    //this.dispatcher.on(name, handler);
    
    this.onClick = func.bind(target);
};

UIelement.prototype.isHeld = function() {
    return this.isPressed;
};

