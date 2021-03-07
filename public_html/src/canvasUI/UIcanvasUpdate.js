/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
UIcanvas.prototype.update = function () {
    //check edit key
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)){
        this.editMode = !this.editMode;
    }
    
    
    if(this.editMode){
        this._updateEditMode();
    }else{
    
        var mouseX = this.UIcamera.mouseWCX();
        var mouseY = this.UIcamera.mouseWCY();
        var mouse = [mouseX, mouseY];

        var element = this.IsMouseOverElement(mouse);


        for(var i = 0; i < this.UIElements.length; i++){

            this.UIElements[i].update(this.UIcamera); 
        }

        //highlights

        if(element[0]){
            this.lastElement = element[1];
            element[1].eHighlight(true);
        }else{
            if(this.lastElement){
                this.lastElement.eHighlight(false);
            }
            this.lastElement = null;
        }

        if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
           // check if releases
           this.clickHold = true;
           if(element[0]){
               element[1].click();
           }
        }else{
           this.clickHold = false; 
        }

    }
};