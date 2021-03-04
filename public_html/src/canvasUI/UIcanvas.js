/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function UIcanvas(){
    
    this.UIwidth = document.getElementById("GLCanvas").width;
    this.UIHeight = document.getElementById("GLCanvas").height;
    
    this.UIcamera = new Camera(
        vec2.fromValues(0, 0),                                                  // position of the camera
        250,                                                                    // width of camera
        [0, 0, this.UIwidth, this.UIHeight]                                                        // viewport (orgX, orgY, width, height)
    );
    
    this.UIElements= null;
    
    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(0, 60);
    this.mMsg.setTextHeight(5);
    
};

UIcanvas.prototype.update = function () {
    this.mMsg.setText("Status");
};

UIcanvas.prototype.draw = function () {
    if(this.UIElements === null){
        return;
    }
    this.UIcamera.setupCanvas();
    
    for(var i = 0; i < this.UIElements.length; i++){
        this.UIElements[i].draw(this.UIcamera);
        
    }
    this.mMsg.draw(this.UIcamera);
};

UIcanvas.prototype.AddElement = function (element){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    this.UIElements.push(element);
};
UIcanvas.prototype.AddButton = function (){
    if(this.UIElements === null){
        this.UIElements = [];
    }
    var button = new Renderable(gEngine.DefaultResources.getConstColorShader());
    button.setColor([1,1,1,1]);
    button.getXform().setPosition(20, 60);
    button.getXform().setSize(50, 20);
    
    
    this.UIElements.push(button);
};

UIcanvas.prototype.TestClick = function (){
    this.mMsg.setText("Clicked!");
    
};

UIcanvas.prototype.IsMouseOverElement = function (mousePosition){
    for(var i = 0; i < this.UIElements.length; i++){
        var buttonPos = this.UIElements[i].getXform().getPosition(); 
        var buttonH = this.UIElements[i].getXform().getHeight();
        var buttonW = this.UIElements[i].getXform().getWidth();

        if(mousePosition[0] >= buttonPos[0] - (buttonW / 2) &&
           mousePosition[0] <= buttonPos[0] + (buttonW / 2) &&    
           mousePosition[1] <= buttonPos[1] + (buttonH / 2) &&
           mousePosition[1] >= buttonPos[1] - (buttonH / 2)){
           
           return [true, this.UIElements[i]];
        }
    }
    
    return [false, null];
};
