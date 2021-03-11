
"use strict";
/*<summary>Update is the most commonly used function to implement any kind of game script.  Update is called every frame.</summary>   
 */
UIcanvas.prototype.update = function () {
    //check edit key
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.E)){
        this.editMode = !this.editMode;
    }
    
    if(this.editMode){
        // TODO
        // allow users to use mouse to edit UI elements
        this._updateEditMode();
    }else{
        // set variables
        var mouseX = this.UIcamera.mouseWCX();
        var mouseY = this.UIcamera.mouseWCY();
        var mouse = [mouseX, mouseY];
        
        // check mouse position for UI element
        var element = this.IsMouseOverElement(mouse);

        // if mouse is over an element
        if(element[0]){
            // set lastElemnt and highlight
            this.lastElement = element[1];
            element[1].highlight(true);
        }else{
            if(this.lastElement){
                this.lastElement.highlight(false);
            }
            this.lastElement = null;
        }

        if (gEngine.Input.isButtonPressed(gEngine.Input.mouseButton.Left)) {
           // check if releases
           this.clickHold = true;
           if(element[0]){
               element[1].Click();
           }
        }else{
           this.clickHold = false; 
        }
        
        // update UI elements
        for(var i = 0; i < this.UIElements.length; i++){
            this.UIElements[i].Update(this.UIcamera); 
        }
    }
};