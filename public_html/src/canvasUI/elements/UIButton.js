/* Developed by 3 Lines of Code
 * Scott Shirley - @scottin3d
 * Kevin Blair - 
 * Nicholas Chambers - 
 * license - MIT
 */

/* global gEngine, GameObject, UIelement */

"use strict";

function UIButton(type, size, pos, color, text) {
    this.eButton = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eButton.setColor([color[0],color[1],color[2],color[3]]);
    this.eButton.getXform().setPosition(pos[0], pos[1]);
    this.eButton.getXform().setSize(size[0], size[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this

    this._initElement(this);
    this.eType = type;
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(10,  pos[1]);
    this.eTextRenderable.setTextHeight(5);
    
    // textures
    this.eButtonTexture = null;
    this.eButtonTextureRenderer = null;
    
    
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    
    // button has a single event
    this.onClick = new UIEvent('onClick');
    this.eVal = null;
    
    
    GameObject.call(this, this.eButton);
    
    return this;
};

gEngine.Core.inheritPrototype(UIButton, UIelement);

UIButton.prototype._update = function (camera) {
    // not highlighted not clicked
    if(!this.isClicked && !this.isHighlighted){
        this._highlight(false);
        this.eText = this.eTextDefault;
    }
    
    // highlighted not clicked
    if(this.isHighlighted && !this.isClicked){
        this.eText = this.eTextHighlighted;
    }
    
    // clicked
    if(this.isClicked){
        this.eText = this.eTextClicked;
    }
    
    this.eTextRenderable.setText(this.eText); 
    this.isClicked = false;
    this.isHighlighted = false;
};

UIButton.prototype._draw = function (camera) {
    // if texture, only draw texture
    if(this.eButtonTextureRenderer){
        this.eButtonTextureRenderer.draw(camera);
    }else{
        this.eButton.draw(camera);
    }
    
    this.eTextRenderable.draw(camera);
};

UIButton.prototype._highlight = function(isOn){
    this.isHighlighted = isOn;
    var c = this.highlightColor;
    if(this.isHighlighted){
        if(this.eButtonTextureRenderer){
            this.eButtonTextureRenderer.setColor([c[0],c[1],c[2],c[3]]);
        }else{
            this.eButton.setColor([c[0],c[1],c[2],c[3]]);
        }
    }else{
        if(this.eButtonTextureRenderer){
            this.eButtonTextureRenderer.setColor([1,1,1,0]);
        }else{
            this.eButton.setColor([1,1,1,1]);
        }
        
    }
};

/*<summary>Set the UI button texture.</summary> 
 * <param = texture>An object, the texture for UI element.</return>
 */
UIButton.prototype._setTexture = function (texture){
    this.eButtonTexture = texture;
    
    // init if not made yet
    if(!this.eButtonTextureRenderer){
        this.eButtonTextureRenderer = new TextureRenderable(this.eButtonTexture);
        var pos = this.eButton.getXform().getPosition();
        var size = this.eButton.getXform().getSize();
        this.eButtonTextureRenderer.getXform().setPosition(pos[0], pos[1]);
        this.eButtonTextureRenderer.getXform().setSize(size[0], size[1]);
        this.eButtonTextureRenderer.setColor([1, 1, 1, 1]);
    }else{
        this.eButtonTextureRenderer.setTexture(this.eButtonTexture);
    }
    // init
};


UIButton.prototype.setHeight = function(height) {
    this.eButton.getXform().setHeight(Math.abs(height));
    if(this.eButtonTextureRenderer){
        this.eButtonTextureRenderer.getXform().setHeight(Math.abs(height));
    }
};

UIButton.prototype._addListener = function(func, target, value){
    //var listener = func.bind(target);
    this.onClick.AddListener(func.bind(target), value);
    //this.eVal = value;
};


UIButton.prototype._click = function(){
    this.isClicked = true;
    this.eButton.setColor([1,0,1,1]);
    this.eText = "Clicked!";
    
    // invoke event
    this.onClick.Invoke();
};

UIButton.prototype.setText = function(text){
    this.eText = text;
};