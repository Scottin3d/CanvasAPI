/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function UIelement() {
    this.isHighlighted = false;
    this.element = null;
    
    this.eListeners = [];
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

UIelement.prototype.addListener = function(listener){
    if(!this.eListeners){
        this.eListeners = [];
    }
    if (listener && (typeof listener === "function")) {
      this.eListeners.push(listener); 
   }
    
};


UIelement.prototype.invoke = function(){
    for (var i = 0; i < this.eListeners.length; i++) {
        this.eListeners[i]();
    }
    
};