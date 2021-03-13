/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global gEngine, GameObject, UIelement */
"use strict";

function UIToggle(type, size, pos, text) {
    this.eToggle = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.eToggle.setColor([1, 0, 0, 1]);
    this.eToggle.getXform().setPosition(pos[0], pos[1]);
    this.eToggle.getXform().setSize(size[0], size[1]);
    
    // set super "UIElement this.element"... there must be an easier way to set this

    this._initElement(this);
    this.eType = type;
    this.eTextRenderable = new FontRenderable(text.toString());
    this.eTextRenderable.setColor([0, 0, 0, 1]);
    this.eTextRenderable.getXform().setPosition(pos[0] - size[0] / 2 + 3,  pos[1]);
    this.eTextRenderable.setTextHeight(5);
    
    this.eTextDefault = text;
    this.eText = this.eTextDefault;
    
    // toggle has a single event
    this.onValueChange = new UIEvent('onValueChange');
    this.eVal = null;
    
    // what state the toggle is on (True/False)
    this.eState = false;
    this.eValChange = false;
    
    
    GameObject.call(this, this.eToggle);
};
gEngine.Core.inheritPrototype(UIToggle, UIelement);

UIToggle.prototype._update = function() {
    if (!this.eState) {
        this.eToggle.setColor([1, 0, 0, 1]);
    }else {
        this.eToggle.setColor([0, 1, 0, 1]);
    }
    if (this.eValChange) {
        this.onValueChange.Invoke(this.eState);
    }
};

UIToggle.prototype._addListener = function(func, target, value) {
    this.onValueChange.AddListener(func.bind(target), value);
};

UIToggle.prototype.SetState = function(value) {
    this.eState = true;
};

UIToggle.prototype._draw = function (camera) {
     this.eToggle.draw(camera);
     this.eTextRenderable.draw(camera);
};
UIToggle.prototype._highlight = function(value) {
    if (value) {
        this.eTextRenderable.setColor([0, 0, 1, 1]);
    }else {
        this.eTextRenderable.setColor([0, 0, 0, 1]);
    }
};

UIToggle.prototype._click = function() {
    this.eState = !this.eState;
    this.eValChange = true;
};
