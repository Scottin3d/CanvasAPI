/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function UIelement(color, pos, size) {
    this.isClicked = false;
    this.isHighlighted = false;
    this.hColor = [1,0,1,1];
    
    this.element = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.element.setColor([color[0],color[1],color[2],color[3]]);
    this.element.getXform().setPosition(pos[0], pos[1]);
    this.element.getXform().setSize(size[0], size[1]);
    
    this.mText = new FontRenderable("Status");
    this.mText.setColor([0, 0, 0, 1]);
    this.mText.getXform().setPosition(0,  pos[1]);
    this.mText.setTextHeight(5);
    
    
    // testing******************************************************************
    /*
    this.target = EventTarget.create();
    
    this.EventTarget = function() { this.listeners = {}; };
    this.EventTarget.prototype.listeners = null;
    
    
    this.EventTarget.prototype.addEventListener = function(type, callback) {
        if (!(type in this.listeners)) {
          this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    };
    
    this.EventTarget.prototype.dispatchEvent = function(event) {
        if (!(event.type in this.listeners)) {
          return true;
        }
        var stack = this.listeners[event.type].slice();

        for (var i = 0, l = stack.length; i < l; i++) {
          stack[i].call(this, event);
        }
        return !event.defaultPrevented;
     };
    */
    //**************************************************************************
    
    GameObject.call(this, this.element);
};
gEngine.Core.inheritPrototype(UIelement, GameObject);

UIelement.prototype.update = function () {
    if(!this.isClicked && !this.isHighlighted){
        this.highlight(false);
    }
    
};

UIelement.prototype.drawElement = function (camera) {
    this.element.draw(camera);
    this.mText.draw(camera);
};

UIelement.prototype._mouseDCX = function () {
    return gEngine.Input.getMousePosX() - this.element.getXform().getXPos();
};
UIelement.prototype._mouseDCY = function () {
    return gEngine.Input.getMousePosY() - this.element.getXform().getYPos();
};

UIelement.prototype.highlight = function(isOn){
    this.isHighlighted = isOn;
    if(this.isHighlighted){
         this.element.setColor([1,1,0,1]);
         this.mText.setText("HighLighted!");
    }else{
        this.element.setColor([1,1,1,1]);
        this.mText.setText("Status!");
    }
};


UIelement.prototype.click = function(){
    this.element.setColor([1,0,1,1]);
    this.mText.setText("Clicked!");
};

