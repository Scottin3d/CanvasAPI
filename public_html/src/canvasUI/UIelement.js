/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UIelement() {
    this.isHighlighted = false;
    this.element = null;
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);


UIelement.prototype.drawElement = function (camera) {
    // forwards to subclass
    this.element.drawE(camera);
};

UIelement.prototype.update = function (camera) {
    // forwards to subclass
    this.element._update(camera);
};

UIelement.prototype.eHighlight = function(bool){
    this.element.highlight(bool);
};


UIelement.prototype.eClick = function(bool){
    this.element.highlight(bool);
};