/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
UIcanvas.prototype.update = function () {
    
    this.mMsg.setText("Status");
    
    var mouseX = this.UIcamera.mouseWCX();
    var mouseY = this.UIcamera.mouseWCY();
    var mouse = [mouseX, mouseY];
    
    var element = this.IsMouseOverElement(mouse);
    
    
    for(var i = 0; i < this.UIElements.length; i++){
  
        this.UIElements[i].update(); 
    }
    
    //highlights
    
    if(element[0]){
        this.lastElement = element[1];
        element[1].highlight(true);
    }else{
        this.lastElement.highlight(false);
        this.lastElement = null;
    }
    
    if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
       // check if releases
       this.clickHold = true;
       if(element[0]){
           element[1].click();
          this.TestClick();
       }
    }else{
       this.clickHold = false; 
    }
    
    
    if(gEngine.Input.isButtonClicked(gEngine.Input.keys.B)){
        this.NewButton();
    }
    
    
};
