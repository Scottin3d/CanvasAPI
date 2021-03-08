/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";
function UIcanvas(){
    this.UIxmlpath  = null;
    this.UIxml = null;
    this.editMode = false;
    this.editModeOverlay = null;
    
    this.clickHold = false;
    this.lastElement = null;
    
    this.UIwidth = null;
    this.UIHeight = null;
    this.UIcamera = null;
    
    this.UIElements = [];
    
    this._initCanvas();
    
};



UIcanvas.prototype.draw = function () {
    if(this.UIElements.length === 0){
        return;
    }
    this.UIcamera.setupCanvas();
    
    for(var i = 0; i < this.UIElements.length; i++){
        this.UIElements[i].drawElement(this.UIcamera);
        
    }
    
    if( this.editMode){
        this.editModeOverlay.draw(this.UIcamera);
    }
    
};

UIcanvas.prototype.AddElement = function (element){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    this.UIElements.push(element);
};

UIcanvas.prototype.IsMouseOverElement = function (mousePosition){
    for(var i = 0; i < this.UIElements.length; i++){
        var buttonPos = this.UIElements[i].getXform().getPosition(); 
        var buttonH = this.UIElements[i].getXform().getHeight();
        var buttonW = this.UIElements[i].getXform().getWidth();

        if((mousePosition[0] >= buttonPos[0] - (buttonW / 2) &&
           mousePosition[0] <= buttonPos[0] + (buttonW / 2) &&    
           mousePosition[1] <= buttonPos[1] + (buttonH / 2) &&
           mousePosition[1] >= buttonPos[1] - (buttonH / 2)) || this.UIElements[i].isHeld()){
           
           return [true, this.UIElements[i]];
        }
    }
    
    return [false, null];
};

UIcanvas.prototype._initCanvas = function (){
    // xml
    this.UIxmlpath  = "src/canvasUI/assets/UIcanvas.xml";
    this.UIxml = document.implementation.createDocument("", "", null);
    
    
    
    // UI camera
    this.UIwidth = document.getElementById("GLCanvas").width;
    this.UIHeight = document.getElementById("GLCanvas").height;
    
    this.UIcamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, this.UIwidth, this.UIHeight]                                     // viewport (orgX, orgY, width, height)
    );
    
    //<Camera CenterX="20" CenterY="60" Width="20" 
    //    Viewport="20 40 600 300"   
    //   BgColor="0 0 1 1.0"
    var camElem = this.UIxml.createElement("Camera");
    camElem.setAttribute("CenterX", "0");
    camElem.setAttribute("CenterY", "0");
    camElem.setAttribute("Width", "250");
    camElem.setAttribute("Viewport", "0 0 " + this.UIwidth + " " + this.UIHeight);
    camElem.setAttribute("BgColor", "0 0 0 0");
    
    // edit mode overlay
    var camVP = this.UIcamera.getViewport();
    this.editModeOverlay = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.editModeOverlay.setColor([0,1,0,.2]);
    this.editModeOverlay.getXform().setPosition(camVP[0], camVP[1]);
    this.editModeOverlay.getXform().setSize(camVP[2], camVP[3]);
    
};